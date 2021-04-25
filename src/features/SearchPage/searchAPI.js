import sanitizeHtml from "sanitize-html";
import $ from "cheerio";
import firebase from "../../database/firebase";

/**
 *
 * @param {*} url
 * @returns status
 */
export const fetchURL = async (url) => {
    // const url = "https://cooking.nytimes.com/recipes/4735-old-fashioned-beef-stew";
    // const url = "https://www.aspicyperspective.com/bulgogi-korean-bbq";
    // const url = "https://natashaskitchen.com/pan-seared-steak/";

    const response = await fetch(url);
    const rawHTML = await response.text();
    // const cleanHTML = sanitizeHtml(rawHTML);
    const parseHTML = $.load(rawHTML);
    const getScripts = parseHTML("script").toArray();
    const schemaNode = getScripts.find((script) => script.attribs.type === "application/ld+json");

    const recipeSchema = schemaNode?.children[0]?.data ?? 404;
    // console.log(recipeSchema);
    if (recipeSchema == 404) return recipeSchema;

    let recipeJSON = JSON.parse(recipeSchema);
    // console.log("recipeJSON", recipeJSON);

    let recipeContext = null;

    if (recipeJSON["@graph"]) {
        recipeContext = recipeJSON["@graph"].find((item) => item["@type"] === "Recipe");
    } else {
        recipeContext = recipeJSON;
    }

    // console.log("recipeContext", recipeContext);
    //Clean up the object
    delete recipeContext.nutrition["@context"];
    delete recipeContext.nutrition["@type"];

    const recipe = {};
    recipe["name"] = recipeContext.name ?? null;
    recipe["description"] = recipeContext.description ?? null;
    recipe["nutrition"] = recipeContext.nutrition ?? null;
    recipe["recipeCuisine"] = recipeContext.recipeCuisine[0] ?? null;
    recipe["recipeYield"] = recipeContext.recipeYield[0] ?? null;
    recipe["recipeIngredient"] = recipeContext.recipeIngredient ?? null;
    recipe["recipeInstructions"] = parseInstructions(recipeContext.recipeInstructions) ?? null;

    // return recipe;
    writeToFirebase(recipe);
    return "201";
};

const parseInstructions = (instructions) => {
    //Only getting HowToStep
    const HowToSteps = instructions.filter((step) => step["@type"] === "HowToStep");
    return HowToSteps.map((item) => item.text);
};

const writeToFirebase = (recipe) => {
    const recipeRef = firebase.database().ref("recipes");
    recipeRef.push(recipe);
    // console.log("writing to firebase", recipe);
};
