import React, { useEffect, useState, useRef, useContext } from "react";
import { Grid, Segment, Form, Input, Menu, Button } from "semantic-ui-react";
import Pusher from "pusher-js";
import { ProgramContext } from "./ProgramContext";
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

function Assigntments(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [progs, setProgs] = useContext(ProgramContext);
    const [email, setEmail] = useState("");
	const [errorText, setErrorText ] =useState('');
    const inputFile = useRef(null);
    const [file, setFile] = useState(undefined);

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const uploadFile = () => {
        let data = new FormData();

        data.append("files", inputFile.current.files[0]);
        fetch(`/api/program/upload/${progs.programId}`, {
            method: "POST",
            headers: {
                Authorization: user.token,
            },
            body: data,
        })            .then((response) => response.json())
		.then((data) => {
			if (data.ok) {
				setErrorText("File uploaded successfully");
			}else{
				setErrorText('FIle upload failed');
			}
		});
    };

    return (
        <div className="h-[100vh] align-top grid place-items-center overflow-auto">
            <Form className="py-12 grid place-items-center">
				<h1 className="text-left">Upload a new file</h1>
                <Form.Field style={{ display: "none" }}>
                    <input
                        type="file"
                        ref={inputFile}
                        onChange={() => {
                            setFile(inputFile.current.files[0]);
							setErrorText('');
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
				{errorText && <p>{errorText}</p>}
            </Form>
            <Grid className="w-[50%]">
                {progs.resources.map((file, index) => {
                    return (
                        <Grid.Row key={"channe" + index}>
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

export default Assigntments;
