import firebase from "../../database/firebase";
import $ from "cheerio";
import { decode } from "html-entities";

/**
 *
 * @param {*} url
 * @returns status
 */
export const fetchURL = async (url) => {
    const response = await fetch(url);
    const rawHTML = await response.text();
    // const cleanHTML = sanitizeHTML(rawHTML);
    // console.log(cleanHTML);

    const parseHTML = $.load(rawHTML);
    const getScripts = parseHTML("script").toArray();
    const schemaNode = getScripts.find((script) => script.attribs.type === "application/ld+json");

    const recipeSchema = schemaNode?.children?.[0]?.data ?? 404;
    // console.log(recipeSchema);
    if (recipeSchema === 404) return 404;

    let recipeJSON = JSON.parse(recipeSchema);
    // console.log("recipeJSON", recipeJSON);

    let recipeContext = null;

    if (recipeJSON["@graph"]) {
        recipeContext = recipeJSON["@graph"].find((item) => item["@type"] === "Recipe");
    } else {
        recipeContext = recipeJSON;
    }

    console.log("recipe context", recipeContext);

    //Clean up the object
    delete recipeContext.nutrition["@context"];
    delete recipeContext.nutrition["@type"];

    const recipe = {};
    recipe["name"] = recipeContext?.name ?? null;
    recipe["description"] = recipeContext?.description ?? null;
    recipe["nutrition"] = recipeContext?.nutrition ?? null;
    recipe["recipeCuisine"] = recipeContext?.recipeCuisine?.[0] ?? null;
    recipe["recipeYield"] = recipeContext?.recipeYield?.[0] ?? null;
    recipe["recipeIngredient"] = recipeContext?.recipeIngredient ?? null;
    recipe["recipeInstructions"] = parseInstructions(recipeContext?.recipeInstructions) ?? null;
    recipe["rating"] = 0;

    //write to firebase
    const recipeRef = firebase.database().ref("recipes");
    recipeRef.push(recipe);

    return "201";
};

const sanitizeHTML = (text) => {
    var element = document.createElement("div");
    element.innerText = text;
    return element.innerHTML;
};

const parseInstructions = (instructions) => {
    //Only getting HowToStep
    const HowToSteps = instructions.filter((step) => step["@type"] === "HowToStep");
    const array = HowToSteps.map((item) => decode(item.text));

    return array;
};
