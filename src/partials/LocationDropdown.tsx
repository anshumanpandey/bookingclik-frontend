import React, { useState, useEffect } from 'react';
import { throttle } from "throttle-debounce";
// @ts-ignore
import { InputBase, CircularProgress, withStyles, WithStyles, createStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { VariableSizeList } from 'react-window';
import axios, { CancelTokenSource } from 'axios';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { IataCode } from '../types';
import { useHttp } from '../utils/AxiosConfig';

const CancelToken = axios.CancelToken;

let styles = createStyles({
    input: {
        width: '80%!important',
        paddingTop: 0,
        fontSize: '0.8rem'
    },
    inputRoot: {
        flexWrap: 'unset',
        width: '100%!important',

    },
    paper: {
        margin: 0
    },
})

interface Prop {
    onChange: (str: IataCode) => void,
    customeClasses?: string,
    style?: React.CSSProperties,
    defaultCode: IataCode | null,
    secondary?: boolean,
    classes?: {
        input: string
        inputRoot: string
    }
}

const LISTBOX_PADDING = 15; // px
function renderRow(props: any) {
    const { data, index, style } = props;
    return React.cloneElement(data[index], {
        style: {
            ...style,
            top: style.top + LISTBOX_PADDING,
        },
    });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    // @ts-ignore
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (ref && ref.current) {
            // @ts-ignore
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
    const itemCount = itemData.length;
    const itemSize = smUp ? 40 : 52;

    const getChildSize = (child: any) => {
        if (React.isValidElement(child) && child.type === ListSubheader) {
            return 50;
        }

        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        // @ts-ignore
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

const LocationDropdownComponent: React.FC<Prop & WithStyles<typeof styles, true>> = ({ secondary, onChange, customeClasses, classes, style, defaultCode }) => {
    const [{ data, loading, error }, refetch] = useHttp<IataCode[]>({ url: '/iataCodes' })

    const [innerDefaultValut, setInnerDefaultValue] = useState(defaultCode);
    const [open, setOpen] = useState(false);
    const [readyToShow, setReadyToShow] = useState<boolean>(!loading);
    const [lastReqToken, setLastReqToken] = useState<CancelTokenSource | null>(null)

    useEffect(() => {
        if (defaultCode) onChange(defaultCode)
    }, []);

    useEffect(() => {
        defaultCode && setInnerDefaultValue(defaultCode)
    }, [defaultCode]);

    const LoadingIndicator = () => {
        return (
            <div className={customeClasses ? customeClasses : "main-search-input-item"}>
                <input type="text" placeholder="Loading codes..." value="" disabled={true} />
            </div>
        )
    };

    const searchCode = throttle(1000, (v: string) => {
        if (lastReqToken) lastReqToken?.cancel()

        const source = CancelToken.source()
        setLastReqToken(source);
        refetch({ params: { search: v }, cancelToken: source.token })
        .then(() => setLastReqToken(null))
        .catch(() => setLastReqToken(null))
    })
    return (
        <>
            <div className={customeClasses ? customeClasses : "main-search-input-item"} style={{
                ...style
            }}>
                <Autocomplete
                    id="combo-box-demo"
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onInputChange={(e, v) => {
                        if (v === '') return
                        return searchCode(v)
                    }}
                    disableListWrap={true}
                    // @ts-ignore
                    ListboxComponent={ListboxComponent}
                    value={innerDefaultValut}
                    loading={open && data !== null}
                    options={(data) ? data : []}
                    loadingText={<></>}
                    onChange={(event: any, value: IataCode | null) => {
                        if (!value) return
                        onChange(value)
                    }}
                    renderOption={(option: IataCode) => {
                        return (
                            <>
                                <i style={{ color: 'rgba(0,0,0,.25)', marginRight: '0.8rem' }} className="fas fa-car"></i>
                                {option.location}
                            </>
                        );
                    }}
                    getOptionLabel={(option: IataCode) => option.location}
                    filterOptions={x => x}
                    classes={{
                        inputRoot: classes.inputRoot,
                        paper: classes.paper,
                    }}
                    renderInput={(params) => {
                        return (
                            <InputBase
                                {...params.InputProps}
                                inputProps={params.inputProps}
                                id={params.id}
                                disabled={params.disabled}
                                classes={{
                                    input: `${classes.input} ${secondary ? 'secondary' : undefined} `,
                                }}
                                placeholder="Select Pickup Location"
                                endAdornment={(
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={15} /> : null}
                                    </React.Fragment>
                                )}
                            />
                        );
                    }}
                />
            </div>
            {(!readyToShow && !error) && <LoadingIndicator />}
        </>
    );
}

export const LocationDropdown = withStyles(styles)(LocationDropdownComponent) as (props: Prop) => React.ReactElement;