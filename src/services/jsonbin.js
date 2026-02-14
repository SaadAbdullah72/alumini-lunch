const MASTER_KEY = '$2a$10$TGVruk5OPC7Xrwv9k6Y7auV/7RPAscIL0yYHMWyeBiTwgl4s5IeaG';
const BIN_ID = '6990d73aae596e708f2b145f';
const BASE_URL = 'https://api.jsonbin.io/v3/b';

export const getSettings = async () => {
    try {
        const response = await fetch(`${BASE_URL}/${BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': MASTER_KEY
            }
        });
        if (!response.ok) throw new Error('Failed to fetch settings');
        const data = await response.json();
        return data.record;
    } catch (error) {
        console.error("JSONBin Read Error:", error);
        return null;
    }
};

export const updateSettings = async (newSettings) => {
    try {
        const response = await fetch(`${BASE_URL}/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY
            },
            body: JSON.stringify(newSettings)
        });
        if (!response.ok) throw new Error('Failed to update settings');
        return await response.json();
    } catch (error) {
        console.error("JSONBin Write Error:", error);
        return null;
    }
};
