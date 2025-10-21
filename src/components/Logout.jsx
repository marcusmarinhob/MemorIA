import { useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

const AUTO_LOGOUT = 60 * 60 * 1000;

export default function Logout() {
    const timerRef = useRef(null);
    const navigate = useNavigate();

const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
        signOut(auth);
        navigate("/login")
    }, AUTO_LOGOUT);
};

useEffect(() => {
    resetTimer();
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart", "touchmove"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    return () => {
        events.forEach((e) => window.removeEventListener(e, resetTimer));
        clearTimeout(timerRef.current);
    };
}, []);

return null;

}