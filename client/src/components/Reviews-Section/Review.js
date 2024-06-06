import React from 'react'
import { turncateStrting } from '../../utils';

const Review = ({ reviewer, text, rating }) => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-md shadow-lg m-2">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{reviewer}</h3>
                <span className="text-green-400">{rating} ★</span>
            </div>
            <p>{turncateStrting(text, 650)}</p>
        </div>
    );
}

export default React.memo(Review)