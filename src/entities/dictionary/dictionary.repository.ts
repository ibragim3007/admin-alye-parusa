import {
  getCardStatuses,
  getContactTypes,
  getSortOrders,
  getTourStates,
} from '@/shared/api/entities/dictionary/dictionary.api';
import { useQuery } from '@tanstack/react-query';
import { Inform } from '@/shared/service/log/log.service';
import { useEffect } from 'react';

const dictionaryKeys = {
  cardStatuses: ['cardStatuses'],
  contactTypes: ['contactTypes'],
  sortOrders: ['sortOrders'],
  tourStates: ['tourStates'],
};

export const useGetCardStatuses = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: dictionaryKeys.cardStatuses,
    queryFn: getCardStatuses,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (error) {
      Inform.error(error);
    }
  }, [error]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export const useGetContactTypes = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: dictionaryKeys.contactTypes,
    queryFn: getContactTypes,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (error) {
      Inform.error(error);
    }
  }, [error]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export const useGetSortOrders = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: dictionaryKeys.sortOrders,
    queryFn: getSortOrders,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (error) {
      Inform.error(error);
    }
  }, [error]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export const useGetTourStates = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: dictionaryKeys.tourStates,
    queryFn: getTourStates,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (error) {
      Inform.error(error);
    }
  }, [error]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
