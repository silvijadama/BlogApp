import React from 'react';

const CardQuestionsAnswers = (props) => {
    return (
        <div>
            <div className="card">{props.card.question}</div>
            <div className="card">{props.card.correct_answer}</div>
        </div>
    );
};

export default CardQuestionsAnswers;