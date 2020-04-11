import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks'
import { LocationDropdown, IataCode } from './LocationDropdown'
import { useHistory } from 'react-router-dom';

type DataToSend = {location: string, puDate: string, doDate: string }

const CarsFilter: React.FC<{ onChange: (d: DataToSend) => void }> = ({onChange}) => {
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [code, setCode] = useState<IataCode>();

    useEffect(() => {
        if (code && startDate && endDate){
            onChange({location: code.code, puDate: startDate, doDate: endDate });
        }
    }, [startDate, endDate, code]);

    return (
        <>
            <LocationDropdown onChange={setCode} />
            <div className="main-search-input-item">
                <input type="text" placeholder="Date: 09/12/2019" onChange={(v) => {
                    if (v.target.value) {
                        setStartDate(v.target.value.toString())
                    }
                }} />
            </div>
            <div className="main-search-input-item">
                <input type="text" placeholder="Date: 09/12/2019" onChange={(v) => {
                    if (v.target.value) {
                        setEndDate(v.target.value.toString())
                    }
                }} />
            </div>
        </>
    );
}

const DefaultFilter: React.FC = () => {
    return (
        <>
        <div className="main-search-input-item">
            <input type="text" placeholder="What are you looking for?" value="" />
        </div>
        <div className="main-search-input-item location" id="autocomplete-container">
            <input type="text" placeholder="Location" id="autocomplete-input" value="" />
            <a href="#"><i className="fa fa-dot-circle-o"></i></a>
        </div>
        </>
    );
}

const filtersPerOption: { [k: string]: React.FC<{ onChange: (d: DataToSend) => void }> } = {
    'cars': CarsFilter
}
export function SearchWidget() {
    const history = useHistory()
    const selectID = 'select-category'
    const [optionToSearch, setOptionToSearch] = useState<string>('cars');
    const [dataToSend, setDataToSend] = useState<DataToSend | null>(null);

    const CurrentFilter = filtersPerOption[optionToSearch] || DefaultFilter;

    const [{ data, loading, error }, postSearch] = useAxios<IataCode[]>('http://localhost:3030/search', { manual: true })

    useEffect(() => {
        // @ts-ignore
        $(`#${selectID}`).niceSelect()
    }, []);

    const send = () => {
        console.log(dataToSend)
        postSearch({ params: dataToSend });
        history.push('/results', {
            search: {
                criteria: { term: 'Cars'},
                results: [
                    {
                      "category": "Cars",
                      "name": "Surelogic",
                      "description": "Sint ipsum magna ut in enim et. Cillum irure Lorem dolor exercitation elit ex esse mollit aliqua dolor. Nostrud quis eu reprehenderit ullamco id nostrud officia esse excepteur proident est in. Amet enim officia proident esse qui consequat. Consectetur irure aliquip aute esse non elit adipisicing laboris pariatur ea."
                    },
                    {
                      "category": "Cars",
                      "name": "Zipak",
                      "description": "Esse eu proident sit amet anim officia mollit laborum ullamco mollit nisi. Irure commodo cupidatat do velit anim id do. Est deserunt reprehenderit labore nostrud dolore est eu. Tempor culpa anim excepteur est pariatur nostrud sit pariatur mollit. Sint nisi pariatur enim cupidatat veniam et laboris et magna sit laboris fugiat."
                    },
                    {
                      "category": "Cars",
                      "name": "Magnemo",
                      "description": "Tempor proident eu nostrud Lorem laborum eu enim. Ad esse dolore labore aliquip velit deserunt eiusmod aliqua fugiat. Et id consectetur consectetur sit velit consequat."
                    },
                    {
                      "category": "Cars",
                      "name": "Apextri",
                      "description": "Eiusmod enim ipsum anim deserunt non nisi do dolor ea. Dolore ad commodo non quis minim minim dolore enim esse magna ex id commodo culpa. Sint qui elit incididunt cupidatat. Ut sunt eiusmod tempor laborum consequat incididunt culpa eiusmod non ut adipisicing adipisicing. Pariatur anim officia ea amet do elit deserunt ut reprehenderit proident amet aliqua."
                    },
                    {
                      "category": "Cars",
                      "name": "Netropic",
                      "description": "Ut eiusmod elit anim sint sunt cupidatat. Ex laboris anim in consectetur qui cupidatat aliqua. Duis aliqua laborum nostrud ea Lorem consequat culpa officia dolore. Laboris officia cupidatat non dolor."
                    },
                    {
                      "category": "Cars",
                      "name": "Slambda",
                      "description": "Laborum magna eu anim sunt laborum eiusmod magna culpa ex cupidatat aliquip eu qui. Veniam do irure ipsum eu eiusmod tempor cupidatat amet commodo dolore consequat aliqua. Aute officia minim aliquip amet consequat exercitation dolor velit. Id culpa ullamco qui excepteur elit cillum labore sunt ea incididunt laboris aliqua. Aute anim exercitation pariatur ex sit nisi proident. Sit eu ea aute cupidatat ad quis magna ullamco commodo magna nisi aliqua minim proident. Lorem cupidatat irure tempor aute non in voluptate ex."
                    },
                    {
                      "category": "Cars",
                      "name": "Techtrix",
                      "description": "Labore et dolore consequat sint esse adipisicing laborum mollit nulla amet cupidatat non aute. Labore sint fugiat quis fugiat consectetur est tempor cillum est dolore officia. Minim aliquip voluptate aute enim non duis eu Lorem consequat dolor enim adipisicing. Anim velit deserunt cillum magna tempor commodo qui ipsum qui commodo. Nulla fugiat proident amet quis ullamco tempor velit consectetur culpa ipsum amet anim ipsum minim. Magna consectetur consequat reprehenderit non officia sunt elit laboris ipsum. Dolore ad fugiat exercitation irure laborum est amet esse."
                    }
                  ]
            }
        });
    }

    return (
        <div className="main-search-input-wrap">
            <div className="main-search-input fl-wrap" style={{ display: 'flex' }}>
                <CurrentFilter onChange={setDataToSend} />
                <div className="main-search-input-item" onClick={(e) => {
                    const val = $('#select-category').val();
                    if (val) {
                        setOptionToSearch(val.toString())
                    }
                }}>
                    <select data-display="All Categories" value={optionToSearch} id={selectID} >
                        <option value={'cars'}>Cars</option>
                        <option value={'shops'}>Shops</option>
                        <option value={'hotels'}>Hotels</option>
                        <option value={'restaurants'}>Restaurants</option>
                        <option value={'fitness'}>Fitness</option>
                        <option value={'events'}>Events</option>``
                    </select>
                </div>
                <button className="main-search-button" onClick={() => send()}>Search</button>
            </div>
        </div>
    );
}