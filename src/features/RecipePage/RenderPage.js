import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, IconButton, Checkbox } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import firebase from "../../database/firebase";

const RenderPage = ({ list, id = null, page }) => {
    const recipeRef = firebase.database().ref("recipes");

    const [editMode, setEditMode] = useState(false);
    const [DisplayList, setDisplayList] = useState(list);
    const EditList = [...DisplayList];

    const initialCheckbox = new Array(list.length).fill(false);
    const [checkBoxes, setCheckBoxes] = useState(initialCheckbox);

    useEffect(() => {}, []);

    const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

    const handleEditButton = () => {
        if (editMode === true && id != null && !equals(DisplayList, EditList)) {
            console.log("saving", id, EditList, page);
            recipeRef.child(id).update({
                [page]: EditList,
            });
        }
        setDisplayList(EditList);
        setEditMode(!editMode);
    };

    const handleItemChange = (e) => {
        EditList[parseInt(e.target.id)] = e.target.value;
        console.log(EditList);
    };

    const handleCheckboxChange = (e) => {
        // e.preventDefault();
        let tempArray = [...checkBoxes];
        let index = parseInt(e.target.id);
        tempArray[index] = !tempArray[index];
        setCheckBoxes(tempArray);
        console.log("checkbox changed", checkBoxes);
    };

    const NormalMode = () => {
        return (
            <React.Fragment>
                <List dense={false}>
                    {DisplayList.map((item, index) => (
                        <ListItem key={index}>
                            <Checkbox
                                id={String(index)}
                                checked={checkBoxes[index]}
                                color="primary"
                                onChange={(e) => handleCheckboxChange(e)}
                            />
                            <ListItemText
                                style={{ textDecoration: checkBoxes[index] ? "line-through" : "none" }}
                                primary={item}
                            />
                        </ListItem>
                    ))}
                </List>
            </React.Fragment>
        );
    };

    const EditMode = () => {
        return (
            <React.Fragment>
                <h1>edit mode</h1>
                <form noValidate autoComplete="off">
                    <List dense={false}>
                        {DisplayList.map((item, index) => (
                            <ListItem key={index}>
                                <TextField
                                    id={String(index)}
                                    variant="outlined"
                                    defaultValue={item}
                                    onChange={(e) => handleItemChange(e)}
                                />
                            </ListItem>
                        ))}
                    </List>
                </form>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <IconButton onClick={handleEditButton}>
                <EditIcon />
            </IconButton>
            {editMode ? <EditMode /> : <NormalMode />}
        </React.Fragment>
    );
};

export default RenderPage;
