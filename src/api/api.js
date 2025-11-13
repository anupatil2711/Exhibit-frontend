// src/api/api.js (Final Static Data Access)
import { exhibitsData } from '../data/exhibits';
import { quizzesData } from '../data/quizzes';
import { diyActivitiesData } from '../data/diy'; // Assuming this imports the data object

/**
 * Retrieves the list of all exhibits from local data.
 */
export const getExhibits = () => {
    return exhibitsData;
};

/**
 * Retrieves a single exhibit by its simple ID.
 */
export const getExhibitById = (id) => {
    return exhibitsData.find(exhibit => exhibit.id === id);
};

/**
 * Retrieves a quiz by its quiz_id.
 */
export const getQuizById = (quizId) => {
    // Return the quiz object directly from the data map
    return quizzesData[quizId];
};

/**
 * Retrieves the list of all DIY projects.
 * Returns an array of project objects suitable for the listing page.
 */
export const getDiyProjects = () => {
    // Convert the data object (keyed by ID) into a simple array of projects
    return Object.values(diyActivitiesData);
};

/**
 * Retrieves a single DIY project by its ID.
 */
export const getDiyProjectById = (id) => {
    // Direct lookup into the data object using the project ID
    return diyActivitiesData[id];
};