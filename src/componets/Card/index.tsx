import React from "react";
import loadingSpinner from '../../icons/1494.gif';

interface ContainerProps {
  title: string;
  loading: boolean;
  error: boolean;
  onReload: () => void;
  children: React.ReactNode;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: string;
  options: string[];
}

const InfoContainer: React.FC<ContainerProps> = ({
  title,
  loading,
  error,
  onReload,
  children,
  handleChange,
  defaultValue,
  options,
}) => {
  return (
    <div className="covidInfoContainer card">
      {loading ? (
        <img src={loadingSpinner} alt="Loading" />
      ) : (
        <>
          <div className="selectRegion">
            <h2 className="confirmedCasesTitle">{title}</h2>
            <select onChange={(e) => handleChange(e)} value={defaultValue}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {error ? (
            <div className="errorContainer">
              <h1>Request failed!</h1>
              <button type="button" onClick={onReload}>
                Reload!
              </button>
            </div>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </div>
  );
};

export default InfoContainer;
