import React from 'react';
import { useState, useEffect } from "react";

import useInfoService from "../../services/InfoService";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Chart = () => {
    const [orgs, setOrgs] = useState([]);
    const {getOrgs} = useInfoService();
    

    useEffect(()=> {
        onRequest();
    }, []);

    const onRequest = () => {
        getOrgs().then(onOrgsLoaded) ;
    }

    const onOrgsLoaded = (newOrgs) => {
        setOrgs(newOrgs);
    }

    const items = renderItems(orgs);

    function renderItems(arr) {
        const petsInOrgs =  arr.map((item, i) => 
        {
            return (
                {
                    "org_name": item.org_name,
                    "pets_count": item.pets_count
                }
            )
        });

        const sortedPetsInOrgs = petsInOrgs.sort((a,b)=>{
            return b.pets_count - a.pets_count
        }).filter(({pets_count}) => pets_count > 0);

        if (sortedPetsInOrgs.length > 4) return sortedPetsInOrgs.slice(0,5);
            else return sortedPetsInOrgs.slice(0,sortedPetsInOrgs.length);

    }

    const labels = items.map(item => item.org_name);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Наибольшее количество животных в организациях",
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label:'Количество',
                data: items.map(item => item.pets_count),
                backgroundColor: '#23b6beb0',
        }]
    };
    return (
        <Bar height={100} options={options} data={data} />
   
    );
}

export default Chart;