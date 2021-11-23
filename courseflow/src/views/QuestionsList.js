import React from 'react'
import {ListGroup} from 'react-bootstrap';

export default function QuestionsList() {
    function alertClicked() {
      alert('test');
    }

    return (
        <ListGroup>
        <ListGroup.Item action href="#link1">
          Question 1
        </ListGroup.Item>
        <ListGroup.Item action href="#link2">
          Question 2
        </ListGroup.Item>
        <ListGroup.Item action onClick={alertClicked}>
          Question 3
        </ListGroup.Item>
      </ListGroup>
    )
};
