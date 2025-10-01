"use client";
import countryList from "react-select-country-list";
import React, { useMemo } from "react";
import SelectField from "./SelectField";

const CountrySelectField = ({
  name,
  label,
  control,
  error,
  required,
}: CountrySelectProps) => {
  function getFlagEmoji(countryCode: string) {
    return countryCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      );
  }
  const options = useMemo(
    () =>
      countryList()
        .getData()
        .map((country) => ({
          value: country.value,
          label: `${getFlagEmoji(country.value)} ${country.label}`,
        })),
    []
  );

  return (
    <SelectField
      name={name}
      label={label}
      placeholder={"Select your country"}
      options={options}
      control={control}
      error={error}
      required
    />
  );
};

export default CountrySelectField;
