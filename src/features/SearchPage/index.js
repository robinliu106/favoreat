import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import * as searchAPI from "./searchAPI";
import Menu from "../Menu";

const Search = () => {
    const [url, setUrl] = useState("");
    const [helperText, setHelperText] = useState("Enter a Recipe URL");

    const handleChange = (e) => {
        setUrl(e.target.value);
        setHelperText("Enter a Recipe URL");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = await searchAPI.fetchURL(url);

        if (status == "404") {
            setHelperText("Could not find a recipe at this url");
        }
        console.log(url);
        setUrl("");
    };
    return (
        <div>
            <Menu />
            <form onSubmit={(e) => handleSubmit(e)} autocomplete={"off"}>
                <TextField
                    id="outlined-full-width"
                    label="URL"
                    style={{ margin: 8 }}
                    value={url ?? ""}
                    helperText={helperText}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => handleChange(e)}
                />
            </form>
        </div>
    );
};

export default Search;
