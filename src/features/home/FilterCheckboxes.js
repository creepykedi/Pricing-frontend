import React from 'react';
import Form from 'react-bootstrap/Form';

export default function FilterCheckboxes() {
    return(
    <div id="inq-status">
        <div>
            <Form.Check inline label="Создан" type="checkbox"  id="inline-checkbox-1"/>
            <Form.Check inline label="Принят" type="checkbox" id="inline-checkbox-2"/>
            <Form.Check inline label="Сформирован" type="checkbox" id="inline-checkbox-3"/>
        </div>
        <div>
            <Form.Check inline label="Возвращен" type="checkbox" id="inline-checkbox-4"/>
            <Form.Check inline label="Просрочен" type="checkbox" id="inline-checkbox-5" />
            <Form.Check inline label="Снят с расчета" type="checkbox" id="inline-checkbox-6"/>
        </div>
</div>
)
}