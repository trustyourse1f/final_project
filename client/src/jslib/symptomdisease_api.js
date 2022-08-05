import axios from 'axios';
import { resolvePath } from 'react-router-dom';

function get_symptomCategory() {
    return axios({
        method: 'GET',
        url: '/symptomcategory',
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.error(err);
    })
}

function get_symptoms() {
    return axios({
        method: 'GET',
        url: `/symptom`
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.error(err);
    });
}

function get_species() {
    return axios({
        method: 'GET',
        url: '/select-species'
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.error(err);
    });
}

function search_symptoms(q) {
    return axios({
        method: 'GET',
        url: `/searchsymptom?q=${encodeURIComponent(q)}`
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.error(err);
    });
}

function post_predictDisease(symptom_lst, species_data) {
    return axios({
        method: 'POST',
        url: '/predict-disease',
        data: {
            symptoms: symptom_lst,
            species: species_data
        }
    })
    .then(res => {
        console.log(res);
        return res;
    })
    .catch(err => {
        console.error(err);
    })
}

export { get_symptomCategory, get_symptoms, get_species, post_predictDisease, search_symptoms };