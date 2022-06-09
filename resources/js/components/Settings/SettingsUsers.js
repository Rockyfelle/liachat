import React, { useEffect, useState, useRef, useContext } from "react";
import {
    Grid,
    Segment,
    Form,
    Input,
    Menu,
    Button,
    Confirm,
} from "semantic-ui-react";
import Pusher from "pusher-js";
import { ProgramContext } from "../ProgramContext";
import styled from "styled-components";

const DFormInput = styled(Form.Input)`
    > * {
        color: white !important;
    }
    input {
        background-color: #3c4f69 !important;
        color: white !important;
    }
`;

function SettingsUsers(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [progs, setProgs] = useContext(ProgramContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [urlToken, setUrlToken] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    function copyToken() {
        navigator.clipboard.writeText(urlToken);
    }

    function addStudent() {
        fetch(`/api/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
            body: JSON.stringify({
                email: email,
                name: name,
                programId: progs.programId,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    setEmail("");
                    setName("");
                    setToken(data.registerToken);
                    setUrlToken(
                        window.location.origin + "/reset/" + data.registerToken
                    );
                    setProgs((prevProgs) => {
                        return {
                            ...prevProgs,
                            users: data.users,
                        };
                    });
                }
            });
    }
    //TODO add delete student in backend
    function deleteUser(id) {
        fetch(`/api/user/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
            body: JSON.stringify({
                id: progs.users[id].id,
                programId: progs.programId,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    setDeleteId(null);
                    setProgs((prevProgs) => {
                        return {
                            ...prevProgs,
                            users: data.users,
                        };
                    });
                }
            });
    }

    return (
        <div className="h-[100%] align-top grid place-items-center">
            <Grid className="w-[50%]">
                <Grid.Row></Grid.Row>
                <Grid.Row columns="equal">
                    <Grid.Column>
                        <Form>
                            <DFormInput
                                label="Name"
                                fluid
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Form>
                            <DFormInput
                                label="Email"
                                fluid
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Button
                            color="green"
                            fluid
                            disabled={!email || !name}
                            onClick={addStudent}
                        >
                            Add Student
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                {token !== "" && (
                    <Grid.Row>
                        <Grid.Column>
                            <Form>
                                <DFormInput
                                    label="Password Reset Link"
                                    fluid
                                    placeholder="xxx"
                                    value={urlToken}
                                    action={{
                                        color: "teal",
                                        labelPosition: "right",
                                        icon: "copy",
                                        content: "Copy",
                                        onClick: copyToken,
                                    }}
                                    onClick={(e) => e.target.select()}
                                />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                )}
                <Grid.Row className="my-10"></Grid.Row>
                {progs.users.map((user, index) => {
                    return (
                        <Grid.Row key={"user" + index}>
                            <Grid.Column width={10} className="text-2xl">
                                <h1>{user.name}</h1>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Button
                                    color="red"
                                    fluid
                                    onClick={() => setDeleteId(index)}
                                >
                                    Remove
                                </Button>
                                {index === deleteId && (
                                    <Confirm
                                        open={true}
                                        onCancel={() => setDeleteId(null)}
                                        onConfirm={() => deleteUser(index)}
                                        content={`Are you sure you want to delete ${user.name}?`}
                                    />
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    );
                })}
            </Grid>
        </div>
    );
}

export default SettingsUsers;
