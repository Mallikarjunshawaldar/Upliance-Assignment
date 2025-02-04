import React, { useState, useEffect } from "react";
import { Button, TextField, Container, Typography, Paper } from "@mui/material";
import { useSpring, animated } from "react-spring";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./Form.css";

const Form = () => {
    const [count, setCount] = useState(0);

    const backgroundAnimation = useSpring({
        backgroundColor: count >= 0
            ? `rgba(100, 100, 255, ${Math.min(count / 10, 1)})`
            : `rgba(255, 100, 100, ${Math.min(Math.abs(count) / 10, 1)})`,
    });

    const [userData, setUserData] = useState({
        id: Date.now(),
        name: "",
        email: "",
        address: "",
        phone: "",
    });

    useEffect(() => {
        const savedData = localStorage.getItem("userData");
        if (savedData) setUserData(JSON.parse(savedData));
    }, []);

    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const toolbarOptions = [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
    ];

    const editorContent = `
    <p>${userData.name}</p>
    <p>${userData.email}</p>
    <p>${userData.address}</p>
    <p>${userData.phone}</p>
  `;

    const chartData = {
        labels: ["Profile Completion", "Interactions", "Activity Level"],
        datasets: [
            {
                label: "User Data Trends",
                data: [count * 5, count * 3, count * 2],
                backgroundColor: ["red", "blue", "green"],
            },
        ],
    };


    return (
        <animated.div className="animated-container" style={backgroundAnimation}>
            <Container maxWidth="md">
                <div className="flex-container">
                    <Paper className="paper-container">
                        <Typography variant="h5">Counter:</Typography>
                        <Typography variant="h2">{count}</Typography>
                        <Button onClick={() => setCount(count + 1)}>Increment</Button>
                        <Button onClick={() => setCount(0)}>Reset</Button>
                        <Button onClick={() => setCount(count - 1)}>Decrement</Button>
                    </Paper>

                    <Paper className="paper-container">
                        <Typography variant="h5">Rich Text Editor</Typography>
                        <ReactQuill
                            theme="snow"
                            value={editorContent}
                            readOnly={false}
                            modules={{ toolbar: toolbarOptions }}
                        />
                    </Paper>
                </div>

                <Paper className="user-form">
                    <Typography variant="h5">User Data Form</Typography>
                    <TextField label="Name" name="name" fullWidth onChange={handleChange} value={userData.name} />
                    <TextField label="Email" name="email" fullWidth onChange={handleChange} value={userData.email} />
                    <TextField label="Address" name="address" fullWidth onChange={handleChange} value={userData.address} />
                    <TextField label="Phone" name="phone" fullWidth onChange={handleChange} value={userData.phone} />
                </Paper>

                <Paper className="chart-container">
                    <Typography variant="h5">User Profile Trends</Typography>
                    <div className="chart-wrapper">
                        <Bar data={chartData} />
                    </div>
                </Paper>
            </Container>
        </animated.div>
    );
};

export default Form;
