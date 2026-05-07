import React, { useState, useContext } from 'react';

const CART_KEY = 'CART_DATA';

export const saveCart = async (cart) => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.log('Error saving cart', e);
  }
};

export const loadCart = async () => {
  try {
    const data = await AsyncStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log('Error loading cart', e);
    return [];
  }
};
