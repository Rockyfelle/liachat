import React, { useEffect, useState, useRef, useContext } from "react";
import { Grid, Segment, Form, Input, Menu, Button } from "semantic-ui-react";
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

function SettingsAssigntments(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [progs, setProgs] = useContext(ProgramContext);
    const inputFile = useRef(null);
    const [file, setFile] = useState(undefined);
    const onButtonClick = () => {
        inputFile.current.click();
    };

    const uploadFile = () => {
        let data = new FormData();

        data.append('files', inputFile.current.files[0])
        fetch(`/api/program/upload/${progs.programId}`, {
            method: "POST",
            headers: {
                'Authorization': user.token,
            },
            body: data
            
        })
            .then((response) => response.json())
    };

    return (
        <div className="align-top grid place-items-center">
            <Form>
                <Form.Field style={{ display: "none" }}>
                    <input
                        type="file"
                        ref={inputFile}
                        onChange={() => {
                            setFile(inputFile.current.files[0]);
                        }}
                    />
                </Form.Field>
                <Form.Button
                    onClick={onButtonClick}
                    color="green"
                    content="Choose file"
                />
                <p>{file ? file.name : ""}</p>
                <Form.Button
                    onClick={uploadFile}
                    color="green"
                    content="Upload file"
                    disabled={file === undefined}
                />
            </Form>
            <Grid className="w-[50%]">
                <Grid.Row></Grid.Row>
                <Grid.Row columns="equal">
                    <Grid.Column></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
                {progs.resources.map((file, index) => {
                    return (
                        <Grid.Row key={"channel" + index}>
                            <Grid.Column width={10} className="text-sm">
                                <h1 className="text-2xl">{file.file_name}</h1>
                                <a href={file.stringyboi} target="_blank">
                                    {file.stringyboi}
                                </a>
                            </Grid.Column>
                            <Grid.Column width={6}></Grid.Column>
                        </Grid.Row>
                    );
                })}
            </Grid>
        </div>
    );
}

export default SettingsAssigntments;
