// src/api/api.js (Renamed and simplified)
import { exhibitsData } from '../data/exhibits';
import { quizzesData } from '../data/quizzes';

/**
 * Retrieves the list of all exhibits from local JSON.
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
    // Return the quiz object directly from the JSON structure
    return quizzesData[quizId];
};

/**
 * Retrieves mock DIY data (placeholder).
 */
export const getDiyProjects = () => {
    return [
        { id: 1, name: "Soda Bottle Rocket", image: "https://picsum.photos/id/350/600/400", description: "Build a simple pressure rocket." },
        
        { id: 2, name: "Potato Battery", image: "https://picsum.photos/id/349/600/400", description: "Generate electricity using a potato." }
    ];
};