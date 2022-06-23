import React, {
  useReducer,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import './filters.scss';
import Select, { components, defaultTheme } from 'react-select';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import _, { find, indexOf, cloneDeep, debounce, isEmpty } from 'lodash';

const { colors } = defaultTheme;
const selectStyles = {
  control: (provided) => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
  noOptionsMessage: (styles) => ({
    ...styles,
    height: '35px',
  }),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPTION_INIT':
      return { ...state, isLoading: true };
    case 'OPTION_ERROR':
      return { ...state, isLoading: false, isError: true };
    case 'OPTION_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [...state.data, ...action.payload],
      };
    case 'OPTION_SET':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [...action.payload],
      };
    case 'OPTION_RESET':
      return { ...state, isLoading: false, isError: false, data: [] };
    case 'SEARCH_INIT':
      return { ...state, isSearching: true };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        isSearching: false,
        searchData: [...state.searchData, ...action.payload],
      };
    case 'SEARCH_RESET':
      return { ...state, isSearching: false, searchData: [] };
    default:
      break;
  }
};

function MultiSelect(props) {
  const [isOpen, setisOpen] = useState(false);
  const [optionSelected, setoptionSelected] = useState(
    props.selectedOptions || []
  );
  const [prevDependency, setprevDependency] = useState(null);
  const [searchPage, setsearchPage] = useState(1);
  const [searchValue, setsearchValue] = useState('');
  const [flag_edit, setFlagEdit] = useState(false);

  const firstTimeRender = useRef(true);
  const [{ isLoading, data, isSearching, searchData }, dispatch] = useReducer(
    reducer,
    {
      isLoading: false,
      isError: false,
      data: [],
      isSearching: false,
      searchData: [],
    }
  );

  const getDependency = (params) => {
    //todo - calculate the dependency selections for current select
    //that is find all selected values before selecting the current

    let dependency = cloneDeep(props.dependency);
    let index = indexOf(
      dependency,
      find(dependency, { field: props.filter_keyword })
    );
    if (index !== -1) {
      dependency = dependency.slice(0, index);
      return dependency;
    } else {
      return dependency;
    }
  };

  const fetchSearch = useCallback(() => {
    // dispatch({ type: 'SEARCH_INIT' })
    if (searchValue.length > 0) {
      let filteredValues = props.initialData.filter((item) =>
        item.label.toUpperCase().includes(searchValue.toUpperCase())
      );
      dispatch({
        type: 'SEARCH_SUCCESS',
        payload: filteredValues,
      });
      if (filteredValues.length > 50) {
        dispatch({
          type: 'OPTION_SET',
          payload: filteredValues ? filteredValues.slice(0, 50) : [],
        });
      } else {
        dispatch({
          type: 'OPTION_SET',
          payload: filteredValues ? filteredValues : [],
        });
      }
    } else {
      dispatch({ type: 'SEARCH_RESET' });
      if (props.initialData.length > 50) {
        dispatch({
          type: 'OPTION_SET',
          payload: props.initialData ? props.initialData.slice(0, 50) : [],
        });
      } else {
        dispatch({
          type: 'OPTION_SET',
          payload: props.initialData ? props.initialData : [],
        });
      }
    }
  }, [searchPage, searchValue, prevDependency]);

  useEffect(() => {
    if (!firstTimeRender.current) {
      fetchSearch(searchPage, searchValue);
    }
    return () => {
      //cleanup
    };
  }, [searchValue]);

  useEffect(() => {
    if (!isEmpty(props.initialData) && isOpen) {
      dispatch({
        type: 'OPTION_SET',
        payload: props.initialData ? props.initialData : [],
      });
    }
  }, [props.initialData]);

  useEffect(() => {
    if (props.selectedOptions && props.selectedOptions.length > 0) {
      setoptionSelected(props.selectedOptions);
    } else setoptionSelected([]);
  }, [props.selectedOptions]);

  useEffect(() => {
    firstTimeRender.current = false;
    return () => {
      //cleanup
    };
  }, []);

  useEffect(() => {
    if (props.reset) {
      setFlagEdit(false);
      setoptionSelected([]);
    }
  }, [props.reset]);

  const dropdownOpen = async (params) => {
    //load the data on initial dropdown click
    // let initialData = props.filterData.filter(item => item.key === props.filter_keyword);
    if (isEmpty(props.initialData)) {
      props.onDropdownOpen && props.onDropdownOpen();
    } else if (!_.isEmpty(props.initialData) && props.forceApiCall) {
      props.onDropdownOpen && props.onDropdownOpen();
      if (props.initialData && props.initialData.length > 50) {
        dispatch({
          type: 'OPTION_SET',
          payload: props.initialData ? props.initialData.slice(0, 50) : [],
        });
      } else {
        dispatch({
          type: 'OPTION_SET',
          payload: props.initialData ? props.initialData : [],
        });
      }
    } else {
      if (props.initialData && props.initialData.length > 50) {
        dispatch({
          type: 'OPTION_SET',
          payload: props.initialData ? props.initialData.slice(0, 50) : [],
        });
      } else {
        dispatch({
          type: 'OPTION_SET',
          payload: props.initialData ? props.initialData : [],
        });
      }
    }

    setprevDependency(getDependency());

    //todo - check if the dependency list of selected  value has changed or not
    // if yes set all state to initial and fire new data fetch req
    // else do nothing
    setisOpen(!isOpen);
  };

  const dropdownClose = async () => {
    //todo -
    // verify if there is difference between the previous selected values and current
    // if yes send selected options list to parent on close to save
    // else if selected values is null remove the option from the selected value of parent
    // else do nothing
    dispatch({ type: 'SEARCH_RESET' });
    setsearchPage(1);
    setsearchValue('');
    // if (!isEmpty(optionSelected)) {
    //   props.onDropdownClose();
    // }
    if (flag_edit) {
      props.updateSelected({
        selectedItems: optionSelected,
        type: props.type,
      });
      setFlagEdit(false);
    }
    setisOpen(!isOpen);
  };

  const dropdownSelectedMessage = () => {
    //todo-
    // items selected
    if (optionSelected.length) {
      if (optionSelected.length === data.length) {
        return 'All Selected';
      } else if (!props.isMulti) {
        return `${
          optionSelected && optionSelected[0] && optionSelected[0].label
        }`;
      } else {
        return `${optionSelected.length} ${
          optionSelected.length > 1 ? ' items' : ' item'
        } selected`;
      }
    }
    return props.placeholder ? props.placeholder : 'Select';
  };

  const onSelectAll = () => {
    //todo -
    // select all options on clicked
    //select only if there is data to pe selected and not all selected
    if (data.length && data.length !== optionSelected.length) {
      setFlagEdit(true);
      setoptionSelected(data);
      if (props.updateSelectedOnEachSelection) {
        props.updateSelected({ selectedItems: data });
      }
    }
  };

  const onClearAll = () => {
    //todo -
    //clear all options on clicked if there is something to be cleared
    if (optionSelected.length) {
      setFlagEdit(true);
      setoptionSelected([]);
      if (props.updateSelectedOnEachSelection) {
        props.updateSelected({ selectedItems: [] });
      }
    }
  };

  const onMenuScrollToBottom = () => {
    //if data already loading dont call fetchData again
    if (!isLoading) {
      if (searchData.length > 0 && searchData.length !== data.length) {
        let newlength = data.length + 50;
        dispatch({
          type: 'OPTION_SET',
          payload: searchData ? searchData.slice(0, newlength) : [],
        });
      } else if (props.initialData.length !== data.length) {
        let newlength = data.length + 50;
        dispatch({
          type: 'OPTION_SET',
          payload: props.initialData
            ? props.initialData.slice(0, newlength)
            : [],
        });
      }
    }
  };

  const onChange = (selected, event) => {
    //on option selected
    let selectedItems = props.isMulti ? selected : [selected];
    setoptionSelected(selectedItems);
    if (props.updateSelectedOnEachSelection) {
      props.updateSelected({ selectedItems });
    }
    setFlagEdit(true);
  };

  const search = useCallback(
    debounce((searchKey) => {
      setsearchValue(searchKey);
    }, 200),
    []
  );

  const handleSearch = (event) => {
    //todo check if search input values are spaces or special characters
    //before calling search
    search(event.target.value);

    // if (event.target.value.length > 0) {
    // 	search(event.target.value);
    // }
    // else {
    // 	dispatch({ type: "SEARCH_RESET" });
    // 	if (props.initialData.length > 50) {
    // 		dispatch({
    // 			type: "OPTION_SET",
    // 			payload: props.initialData
    // 				? props.initialData.slice(0, 50)
    // 				: [],
    // 		});
    // 	} else {
    // 		dispatch({
    // 			type: "OPTION_SET",
    // 			payload: props.initialData ? props.initialData : [],
    // 		});
    // 	}
    // }
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={dropdownClose}
      className={
        props.isDisabled
          ? 'dropdown-wrapper dropdown-wrapper-disabled'
          : 'dropdown-wrapper'
      }
      target={
        <button
          //iconAfter={<ChevronDown />}
          id='dropdown-button'
          data-testid='dropdown-button'
          onClick={dropdownOpen}
          isselected={`${isOpen}`}
          className='dropdown-button'
        >
          <span className='selected-text'>{dropdownSelectedMessage()}</span>
          <span className='toggle-icon'>
            <ChevronDown />
          </span>
        </button>
      }
    >
      <div className='filter-options-group'>
        {!props.hideClearSelection && (
          <div className='filter-options-item'>
            <div
              id='dropdown-clear-btn'
              data-testid='dropdown-clear'
              className='filter-options-item-text'
              onClick={onClearAll}
            >
              <FilterAltIcon
                sx={{
                  fontSize: '16px',
                  margin: '0 6px',
                }}
              />
              Clear Selection
              {props.label ? (
                <span style={{ textTransform: 'uppercase' }}>
                  from {props.label}
                </span>
              ) : null}
            </div>
          </div>
        )}
        {props.isMulti && (
          <div className='filter-options-item'>
            <div
              id='select-all-btn'
              className='filter-options-item-text'
              onClick={onSelectAll}
            >
              {data.length &&
              optionSelected.length &&
              data.length === optionSelected.length ? (
                <CheckBoxIcon
                  sx={{
                    fontSize: '16px',
                    margin: '0 6px',
                    color: '#0175ff',
                  }}
                />
              ) : (
                <CheckBoxOutlineBlankIcon
                  sx={{
                    fontSize: '16px',
                    margin: '0 6px',
                  }}
                />
              )}
              Select All
              {props.label ? (
                <span style={{ textTransform: 'uppercase' }}>
                  from {props.label}
                </span>
              ) : null}
            </div>
          </div>
        )}
      </div>
      {!props.hideSearch && (
        <div>
          <div className='search-select__control'>
            <div className='search-select__value-container'>
              <div
                className='multi-select__input'
                style={{ display: 'inline-block' }}
              >
                <input
                  id='search-select-input'
                  autoCapitalize='none'
                  autoComplete='off'
                  autoCorrect='off'
                  spellCheck='false'
                  tabIndex='0'
                  type='text'
                  aria-autocomplete='list'
                  placeholder='Search...'
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className='multi-select__indicators'>
              <div
                style={{
                  color: 'rgb(204, 204, 204)',
                  height: '24px',
                  width: '32px',
                }}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  focusable='false'
                  role='presentation'
                >
                  <path
                    d='M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z'
                    fill='currentColor'
                    fillRule='evenodd'
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      <Select
        //style select
        className='multi-select-container'
        classNamePrefix='multi-select'
        styles={selectStyles}
        placeholder='Search...'
        //dropdown behaviour change
        menuIsOpen
        autoFocus
        backspaceRemovesValue={false}
        controlShouldRenderValue={false}
        tabSelectsValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        isMulti={props.isMulti ? true : false}
        //custom components
        components={{
          DropdownIndicator,
          IndicatorSeparator: null,
          Option,
          NoOptionsMessage,
          MenuList,
          LoadingMessage,
        }}
        //custom functions and data load
        options={data}
        // options={props.initialData}
        value={optionSelected}
        isLoading={isLoading || isSearching}
        // onMenuScrollToBottom=
        onScroll={onMenuScrollToBottom}
        onChange={onChange}
      />
    </Dropdown>
  );
}

export default MultiSelect;

//custom select components

const LoadingMessage = (props) => {
  let loadingElement = [];
  for (let i = 0; i < 10; i++) {
    loadingElement.push(
      <div className='multi-select__option' style={{ padding: ' 8px 12px' }}>
        <div className='checkbox'>
          <input type='checkbox' checked='' onChange={() => null} />
          <label htmlFor='checkbox'>
            <span>Loading...</span>
          </label>
        </div>
      </div>
    );
  }
  return <>{loadingElement}</>;
};

const MenuList = (props) => {
  let loadingElement = [];
  loadingElement.push(props.children);
  if (props.isLoading) {
    for (let i = 0; i < 4; i++) {
      loadingElement.push(
        <div className='multi-select__option' style={{ padding: ' 8px 12px' }}>
          <div className='checkbox'>
            <input type='checkbox' checked='' onChange={() => null} />
            <label htmlFor='checkbox'>
              <span>Loading...</span>
            </label>
          </div>
        </div>
      );
    }
  }

  return (
    <div
      className='ScorllCheck'
      onScroll={(e) => {
        let element = e.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
          // do something at end of scroll
          props.selectProps.onScroll();
        }
      }}
    >
      <components.MenuList className='menulistScroll' {...props}>
        {loadingElement}
      </components.MenuList>
    </div>
  );
};

const Option = (props) => {
  return (
    <components.Option {...props} className='loading'>
      <div className='checkbox'>
        <input
          type='checkbox'
          data-testid={`${props.label}select`}
          checked={props.isSelected}
          onChange={() => null}
        />
        <label htmlFor='checkbox'>
          <span data-testid={props.label}>{props.label}</span>
        </label>
      </div>
    </components.Option>
  );
};

const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <div>
        <p className='filter-no-data'>No Data</p>
      </div>
    </components.NoOptionsMessage>
  );
};

// component to create dropdown dropdown
const Menu = (props) => {
  const shadow = 'hsla(218, 50%, 10%, 0.1)';
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: 'absolute',
        left: '-1px',
        zIndex: 2,
        width: '101%',
        minWidth: '210px',
      }}
      {...props}
    />
  );
};

const Blanket = (props) => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: 'fixed',
      zIndex: 1,
    }}
    {...props}
  />
);
const Dropdown = ({ children, isOpen, target, onClose, className }) => (
  <div
    style={{ position: 'relative', lineHeight: '20px' }}
    className={className}
  >
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
);
const Svg = (p) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    focusable='false'
    role='presentation'
    {...p}
  />
);
const DropdownIndicator = () => (
  <div style={{ color: colors.neutral20, height: 24, width: 32 }}>
    <Svg>
      <path
        d='M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z'
        fill='currentColor'
        fillRule='evenodd'
      />
    </Svg>
  </div>
);
const ChevronDown = () => (
  <Svg style={{ marginRight: -6 }}>
    <path
      d='M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </Svg>
);
