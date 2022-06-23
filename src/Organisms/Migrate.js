import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton';
import LoadingOverlay from '../components/LoadingOverlay';
import {
  allPromise,
  allSheetName,
  delete_category_treemap,
  post_data,
} from '../services/resetDb';

const Migrate = () => {
  const [isSheetLoading, setIsSheetLoading] = useState(false);
  const [isDropDbLoading, setIsDropDbLoading] = useState(false);
  const [isDbInsertLoading, setIsDbInsertLoading] = useState(false);
  const [isDropDbSuccess, setIsDropDbSuccess] = useState(false);
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    if (isDropDbSuccess || !sheetData?.length) return;

    const updateDb = async () => {
      setIsDbInsertLoading(true);

      try {
        for (let index = 0; index < allSheetName.length; index++) {
          const item = allSheetName[index];
          await post_data(item.url, sheetData[index]);
        }
        alert('DB migration successfull');
      } catch (error) {
        alert(
          'Something went wrong while updating db. please try migrating the Database again'
        );
      } finally {
        setIsDbInsertLoading(false);
      }
    };
    updateDb();
  }, [isDropDbSuccess, sheetData]);

  const dropAllDb = async () => {
    try {
      setIsDropDbLoading(true);
      await delete_category_treemap();
      setIsDropDbSuccess(true);
    } catch (error) {
      alert(
        'Something went wrong while deleteing db. please try migrating the Database again'
      );
    } finally {
      setIsDropDbLoading(false);
    }
  };

  const getSheetData = async () => {
    try {
      setIsSheetLoading(true);
      const response = await axios.all(allPromise.map((el) => el()));
      setSheetData(response);
    } catch (error) {
      alert(
        'Something went wrong while fetching data from google sheet. please try migrating the Database again'
      );
    } finally {
      setIsSheetLoading(false);
    }
  };
  const onButtonClick = () => {
    getSheetData();
    dropAllDb();
  };

  if (isSheetLoading || isDropDbLoading || isDbInsertLoading) {
    return (
      <LoadingOverlay
        loader
        text='Migrating Data to database'
        position='fixed'
        background='transparent'
      />
    );
  }

  return (
    <CustomButton
      variant='contained'
      isPrimary
      width={300}
      label='Migrate Data'
      onButtonClick={onButtonClick}
    />
  );
};

export default Migrate;
