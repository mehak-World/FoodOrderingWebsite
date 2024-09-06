import React from 'react';

export const ShimmerCard = () => {
    return (
        <div>
            <div className="card"></div>
            <div className="small-card"></div>
            <div className="smaller-card"></div>
        </div>
    );
}

export const Shimmer = () => {
    return (
        <div className = "shimmer">
            {Array.from({ length: 20 }).map((_, index) => (
                <ShimmerCard key={index} />
            ))}
        </div>
    );
}


