import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import TaskInfoWrapper from '../components/TaskInfoWrapper';
import { useSelector } from 'react-redux';

import { APIURL } from '../data';

export default function HomeworPage(props) {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [homeworkData, setHomeworkData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHomeworkData = async () => {
            try {
                const response = await fetch(APIURL + 'get-homework/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data)
                setHomeworkData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchHomeworkData();
    }, [accessToken]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="App">
            <Header />
            <div className="page-container-column">
                <PageTitle pageName="ДОМАШНИЕ ЗАДАНИЯ" />
                <div className="base-tasks-list">
                    {homeworkData.map((task, index) => (
                        <TaskInfoWrapper key={index} taskName={task.fk_variant_id} taskDeadline={task.dead_line} taskStatus={task.status} variantID={task.fk_variant_id} points={task.earned_points}/>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}