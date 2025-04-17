import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const FilterButtons = ({ filter, setFilter }) => {
  return (
    <div className="filter-buttons">
      <ButtonGroup variant="contained">
        <Button
          onClick={() => setFilter('all')}
          disabled={filter === 'all'}
        >
          Все
        </Button>
        <Button
          onClick={() => setFilter('active')}
          disabled={filter === 'active'}
        >
          Активные
        </Button>
        <Button
          onClick={() => setFilter('completed')}
          disabled={filter === 'completed'}
        >
          Выполненные
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default FilterButtons;