import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { availTheme, changeTheme } from '../store/themeSlice';

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const isLight = theme === availTheme.light;
  useEffect(() => {
    const setDarkMode = () => {
      document.querySelector('body').setAttribute('data-theme', 'dark');
    };
    const setLightMode = () => {
      document.querySelector('body').setAttribute('data-theme', 'light');
    };

    if (isLight) setLightMode();
    else setDarkMode();
  }, [isLight]);

  return (
    <>
      <input
        type="checkbox"
        className="btn-check"
        onChange={() => {
          dispatch(changeTheme());
        }}
        id="btn-check"
      />
      <Button
        size="sm"
        as="label"
        variant={isLight ? 'dark' : 'light'}
        className="text-capitalize"
        htmlFor="btn-check"
      >
        {isLight ? 'dark' : 'light'}
      </Button>
    </>
  );
};

export default ThemeToggler;
