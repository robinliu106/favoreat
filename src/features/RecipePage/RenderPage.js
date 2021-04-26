import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import firebase from "../../database/firebase";

const RenderPage = ({ list, id = null, page }) => {
    const recipeRef = firebase.database().ref("recipes");

    const [editMode, setEditMode] = useState(false);
    const [DisplayList, setDisplayList] = useState(list);
    const EditList = [...DisplayList];

    useEffect(() => {}, [DisplayList]);

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

    const NormalMode = () => {
        return (
            <React.Fragment>
                <List dense={false}>
                    {DisplayList.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item} />
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
