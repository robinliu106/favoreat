import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import * as searchAPI from "./searchAPI";
import Menu from "../Menu";
import { Redirect } from "react-router-dom";

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
        } else if (status == "201") {
            <Redirect push to="/" />;
        }

        console.log(url);
        setUrl("");
    };
    return (
        <div>
            <Menu />
            <form onSubmit={(e) => handleSubmit(e)} autoComplete={"off"}>
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
