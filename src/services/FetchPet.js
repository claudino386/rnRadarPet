export const API = 'http://10.0.2.2:3000';

export const getMissedPets = async () => fetch(`${API}/pets`).then((response) => response.json());
export const getMissedPet = async (id) => fetch(`${API}/pets/${id}`).then((response) => response.json());
