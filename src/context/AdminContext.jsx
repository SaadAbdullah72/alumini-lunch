import { createContext, useState, useEffect, useContext } from 'react';
import * as jsonbin from '../services/jsonbin';

const AdminContext = createContext();

// HARDCODED LOGO (Put your file in public/logo.png)
const HARDCODED_LOGO = "/logo.png";

const defaultSettings = {
    eventTitle: "Annual Alumni Lunch 2026",
    eventDate: "2026-03-15T12:00",
    logo: HARDCODED_LOGO,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoRotation: 0,
    registrationLink: "https://docs.google.com/forms",
};

// IndexedDB Helpers
const DB_NAME = 'AlumniAppDB';
const STORE_NAME = 'media';
const DB_VERSION = 2;

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject('DB Error');
    });
};

const saveVideoToDB = async (videoData) => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(videoData, 'heroVideo');
        return new Promise((resolve) => {
            tx.oncomplete = () => resolve(true);
        });
    } catch (err) {
        console.error("IndexedDB Save Error:", err);
        return false;
    }
};

const getVideoFromDB = async () => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.get('heroVideo');
        return new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve(null);
        });
    } catch (err) {
        console.error("IndexedDB Load Error:", err);
        return null;
    }
};

const deleteVideoFromDB = async () => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete('heroVideo');
        return new Promise((resolve) => {
            tx.oncomplete = () => resolve(true);
        });
    } catch (err) {
        console.error("IndexedDB Delete Error:", err);
        return false;
    }
};

export const AdminProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('alumniSettings');
        return saved ? { ...JSON.parse(saved), logo: HARDCODED_LOGO } : defaultSettings;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('adminAuth') === 'true';
    });

    // Load initial settings
    useEffect(() => {
        const loadSettings = async () => {
            // 1. Try fetching from Cloud (Latest Truth)
            const cloudSettings = await jsonbin.getSettings();

            if (cloudSettings) {
                // Keep the hardcoded logo, trigger update
                const merged = { ...settings, ...cloudSettings, logo: HARDCODED_LOGO };
                setSettings(merged);
                localStorage.setItem('alumniSettings', JSON.stringify(merged));
            } else {
                // Fallback to LocalStorage if cloud fails
                const saved = localStorage.getItem('alumniSettings');
                if (saved) {
                    try {
                        setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
                    } catch (e) {
                        console.error("Failed to parse local settings");
                    }
                }
            }
            // Load heavy video from IndexedDB if needed
            const videoData = await getVideoFromDB();
            if (videoData) {
                setSettings(prev => ({ ...prev, videoUrl: videoData }));
            }
        };
        loadSettings();
    }, []);

    // Save changes
    const updateSettings = async (newSettings) => {
        // Enforce hardcoded logo
        const settingsToProcess = { ...newSettings, logo: HARDCODED_LOGO };

        // 1. Separate video if it's a large data URL
        let settingsToSave = { ...settingsToProcess };
        let videoToSave = null;

        if (newSettings.videoUrl && newSettings.videoUrl.startsWith('data:')) {
            videoToSave = newSettings.videoUrl;
            // Don't save large string to localStorage
            settingsToSave.videoUrl = 'indexed_db_blob';
            // For JSONBin, we mark it as local file
            settingsToSave.videoUrl = 'local_file_active';
        } else {
            // If we are saving a link (or nothing), clear any old video from DB to prevent zombie loading
            await deleteVideoFromDB();
        }

        // 2. Save lightweight config to LocalStorage
        try {
            localStorage.setItem('alumniSettings', JSON.stringify(settingsToSave));
        } catch (e) {
            console.error("LocalStorage Limit Exceeded:", e);
        }

        // 3. Save heavy video to IndexedDB
        if (videoToSave) {
            await saveVideoToDB(videoToSave);
        }

        // 4. Update memory state immediately for UI
        setSettings(settingsToProcess);

        // 5. Sync to Cloud (JSONBin) - Global Sync
        if (settingsToSave.videoUrl !== 'local_file_active') {
            await jsonbin.updateSettings(settingsToSave);
        }
    };

    const login = (password) => {
        if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('adminAuth', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
    };

    return (
        <AdminContext.Provider value={{ settings, updateSettings, isAuthenticated, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
