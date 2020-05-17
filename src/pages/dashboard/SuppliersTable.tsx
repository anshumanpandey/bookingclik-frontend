import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks'
import DataTable from 'react-data-table-component';
import { getSupplierInfo } from '../../crud/click-tracker.crud';
// @ts-ignore
import Calendar from 'rc-calendar';
// @ts-ignore
import DatePicker from 'rc-calendar/lib/Picker';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import FuzzySearch from 'fuzzy-search';


export const SuppliersTable: React.FC = () => {
    const [dates, setDates] = useState<[moment.Moment, moment.Moment]>([moment().startOf('month'), moment().endOf('month')])
    const [fuzzyString, setFuzzyString] = useState<string | null>(null)
    const [{ data, loading, error }, refetch] = useAxios(getSupplierInfo())
    const [filteredData, setFilteredData] = useState<any[]>([])

    useEffect(() => {
        if (fuzzyString === null) return
        const searcher = new FuzzySearch(data || [], ['clientname']);
        setFilteredData(searcher.search(fuzzyString))
    }, [fuzzyString]);

    useEffect(() => {
        setFilteredData(data)
    }, [loading]);

    const CalendarInput = () => {
        return (
            <>
                <DatePicker
                    value={dates[0]}
                    onChange={(value: moment.Moment) => {
                        return setDates(p => [value, p[1]]);
                    }}
                    animation="slide-up"
                    calendar={<Calendar
                        showDateInput={false}
                        format="YYYY-MM-DD"
                        dateInputPlaceholder="please input"
                        defaultValue={dates[0]}
                    />}
                >
                    {
                        () => {
                            return (
                                <div style={{ padding: 'unset', margin: 'unset', boxShadow: 'unset' }} className="main-register">
                                    <div className="custom-form">
                                        <input
                                            style={{ margin: 0, backgroundColor: 'white' }}
                                            type="text"
                                            placeholder="please select"
                                            readOnly
                                            className="ant-calendar-picker-input ant-input"
                                            value={`${dates[0].format('YYYY-MM-DD')}` || ''}
                                        />
                                    </div>
                                </div>
                            );
                        }
                    }
                </DatePicker>
                <DatePicker
                    value={dates[1]}
                    onChange={(value: moment.Moment) => {
                        return setDates(p => [p[0], value]);
                    }}
                    animation="slide-up"
                    calendar={<Calendar
                        showDateInput={false}
                        format="YYYY-MM-DD"
                        dateInputPlaceholder="please input"
                        defaultValue={dates[1]}
                    />}
                >
                    {
                        () => {
                            return (
                                <div style={{ padding: 'unset', margin: 'unset', boxShadow: 'unset' }} className="main-register">
                                    <div className="custom-form">
                                        <input
                                            style={{ margin: 0, backgroundColor: 'white' }}
                                            type="text"
                                            placeholder="please select"
                                            readOnly
                                            className="ant-calendar-picker-input ant-input"
                                            value={`${dates[1].format('YYYY-MM-DD')}` || ''}
                                        />
                                    </div>
                                </div>
                            );
                        }
                    }
                </DatePicker>
            </>
        );
    }

    return (
        <div className="statistic-container fl-wrap">
            <DataTable
                actions={
                    <>
                        <CalendarInput />
                        <div style={{ padding: 'unset', margin: 'unset', boxShadow: 'unset' }} className="main-register">
                            <div className="custom-form">
                                <input
                                    onChange={(e) => setFuzzyString(e.target.value)}
                                    style={{ margin: 0, backgroundColor: 'white' }}
                                    placeholder="Search Car Rental Companies"
                                    type="text"
                                    value={fuzzyString || ''}
                                />
                            </div>
                        </div>
                    </>
                }
                progressPending={loading}
                columns={[
                    {
                        name: 'Supplier Name',
                        selector: 'clientname',
                    },
                    {
                        name: 'Total Click Amount',
                        selector: 'ClickTracks.length',
                        cell: (client: { ClickTracks: { created_at: string }[] }) => {
                            return client.ClickTracks.filter((click: { created_at: string }) => {
                                return moment(click.created_at, "YYYY-MM-DD HH:mm:ss").isBetween(dates[0], dates[1])
                            }).length
                        }
                    },
                ]}
                data={filteredData}
            />
        </div>
    )
}
