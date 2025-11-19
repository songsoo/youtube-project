import React from 'react';
import { useNavigate } from 'react-router';

export default function HomeButton() {
    const navigate = useNavigate();

    return <button onClick={()=>navigate('/')}>홈 버튼</button>;
}
