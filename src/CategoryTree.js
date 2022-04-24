import React, { useState, useEffect } from 'react';
import Selectrix from 'react-selectrix';

export default function CategoryTree({
  categories,
  setCategoryId,
  getCategoryAttributes,
  setAttributesView,
  setAttributesLoading,
  setAttributeData,
}) {
  const ImportantStar = () => {
    return <span className="text-danger">*</span>;
  };

  const [subLength, setSubLength] = useState(1);
  const [activeOptions, setActiveOptions] = useState([]);
  const [activeOptions3, setActiveOptions3] = useState([]);
  const [activeOptions4, setActiveOptions4] = useState([]);
  const [activeOptions5, setActiveOptions5] = useState([]);
  const [activeOptions6, setActiveOptions6] = useState([]);
  const [activeOptions7, setActiveOptions7] = useState([]);
  const [activeOptions8, setActiveOptions8] = useState([]);
  const [activeOptions9, setActiveOptions9] = useState([]);
  const [activeOptions10, setActiveOptions10] = useState([]);
  const reset = (index) => {
    setSubLength(index);
    index = index + 1;
    if (index === 1) {
      setActiveOptions([]);
    }
    if (index <= 2) setActiveOptions([]);
    if (index <= 3) setActiveOptions3([]);
    if (index <= 4) setActiveOptions4([]);
    if (index <= 5) setActiveOptions5([]);
    if (index <= 6) setActiveOptions6([]);
    if (index <= 7) setActiveOptions7([]);
    if (index <= 8) setActiveOptions8([]);
    if (index <= 9) setActiveOptions9([]);
    if (index <= 10) setActiveOptions10([]);
    setAttributesView([]);
    setAttributesLoading(true);
    setAttributeData([]);
  };
  const handleClick = (value) => {
    if (value) {
      let category = categories.categories.filter((elem) => {
        if (elem.id === value) {
          return true;
        }
      });
      setActiveOptions(category[0].subCategories);
      setSubLength(2);
    } else {
      reset(1);
    }
  };
  const handleClick2 = (value) => {
    if (value) {
      let category = activeOptions.filter((elem) => {
        if (elem.id === value) {
          return true;
        }
      });
      if (category[0].subCategories.length === 0) {
        getCategoryAttributes(value);
        return setCategoryId(value);
      }
      setActiveOptions3(category[0].subCategories);
      setSubLength(3);
    } else {
      reset(2);
    }
  };
  const handleClick3 = (value) => {
    if (value) {
      let category = activeOptions3.filter((elem) => {
        if (elem.id === value) {
          return true;
        }
      });
      if (category[0].subCategories.length === 0) {
        getCategoryAttributes(value);
        return setCategoryId(value);
      }
      setActiveOptions4(category[0].subCategories);
      setSubLength(4);
    } else {
      reset(3);
    }
  };
  const handleClick4 = (value) => {
    if (value) {
      let category = activeOptions4.filter((elem) => {
        if (elem.id === value) {
          return true;
        }
      });
      if (category[0].subCategories.length === 0) {
        getCategoryAttributes(value);
        return setCategoryId(value);
      }
      setActiveOptions5(category[0].subCategories);
      setSubLength(5);
    } else {
      reset(4);
    }
  };
  const handleClick5 = (value) => {
    if (value) {
      let category = activeOptions5.filter((elem) => {
        if (elem.id === value) {
          return true;
        }
      });
      if (category[0].subCategories.length === 0) {
        getCategoryAttributes(value);
        return setCategoryId(value);
      }
      setActiveOptions6(category[0].subCategories);
      setSubLength(6);
    } else {
      reset(5);
    }
  };
  const handleClick6 = (value) => {
    if (value) {
      let category = activeOptions6.filter((elem) => {
        if (elem.id === value) {
          return true;
        }
      });
      if (category[0].subCategories.length === 0) {
        getCategoryAttributes(value);
        return setCategoryId(value);
      }
      setActiveOptions7(category[0].subCategories);
      setSubLength(7);
    } else {
      reset(6);
    }
  };
  const handleClick7 = (value) => {
    if (value) {
      let category = activeOptions7.filter((elem) => {
        if (elem.id === value) {
          return true;
        }
      });
      if (category[0].subCategories.length === 0) {
        getCategoryAttributes(value);
        return setCategoryId(value);
      }
      setActiveOptions8(category[0].subCategories);
      setSubLength(8);
    } else {
      reset(7);
    }
  };
  const handleClick8 = (value) => {
    if (value) {
      let category = activeOptions8.filter((elem) => {
        if (elem.id === value) {
          return true;
        }
      });
      if (category[0].subCategories.length === 0) {
        getCategoryAttributes(value);
        return setCategoryId(value);
      }
      setActiveOptions9(category[0].subCategories);
      setSubLength(9);
    } else {
      reset(9);
    }
  };
  const handleClick9 = (value) => {
    if (value) {
      let category = activeOptions9.filter((elem) => {
        if (elem.id === value) {
          return true;
        }
      });
      if (category[0].subCategories.length === 0) {
        getCategoryAttributes(value);
        return setCategoryId(value);
      }
      setActiveOptions10(category[0].subCategories);
      setSubLength(10);
    } else {
      reset(10);
    }
  };
  const handleClick10 = (value) => {
    if (value) {
      let category = activeOptions10.filter((elem) => {
        if (elem.id === value) {
          return true;
        }
      });
      getCategoryAttributes(value);
      return setCategoryId(value);
    }
  };

  return (
    <>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Kategori
                <ImportantStar />
              </label>
              <Selectrix
                height={250}
                customScrollbar={true}
                placeholder="Kategori Seçimi Yapınız"
                customKeys={{
                  key: 'id',
                  label: 'name',
                }}
                options={categories.categories}
                onChange={(value) => handleClick(value.key)}
              />
            </div>
          </div>
          {subLength >= 2 ? (
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  Alt Kategori
                  <ImportantStar />
                </label>
                <Selectrix
                  height={250}
                  customScrollbar={true}
                  placeholder="Alt Kategoriyi Seçimi Yapınız"
                  customKeys={{
                    key: 'id',
                    label: 'name',
                  }}
                  options={activeOptions}
                  onChange={(value) => handleClick2(value.key)}
                />
              </div>
            </div>
          ) : (
            ''
          )}

          {subLength >= 3 ? (
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  Alt Kategori
                  <ImportantStar />
                </label>
                <Selectrix
                  height={250}
                  customScrollbar={true}
                  placeholder="Alt Kategoriyi Seçimi Yapınız"
                  customKeys={{
                    key: 'id',
                    label: 'name',
                  }}
                  options={activeOptions3}
                  onChange={(value) => handleClick3(value.key)}
                />
              </div>
            </div>
          ) : (
            ''
          )}
          {subLength >= 4 ? (
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  Alt Kategori
                  <ImportantStar />
                </label>
                <Selectrix
                  height={250}
                  customScrollbar={true}
                  placeholder="Alt Kategoriyi Seçimi Yapınız"
                  customKeys={{
                    key: 'id',
                    label: 'name',
                  }}
                  options={activeOptions4}
                  onChange={(value) => handleClick4(value.key)}
                />
              </div>
            </div>
          ) : (
            ''
          )}
          {subLength >= 5 ? (
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  Alt Kategori
                  <ImportantStar />
                </label>
                <Selectrix
                  height={250}
                  customScrollbar={true}
                  placeholder="Alt Kategoriyi Seçimi Yapınız"
                  customKeys={{
                    key: 'id',
                    label: 'name',
                  }}
                  options={activeOptions5}
                  onChange={(value) => handleClick5(value.key)}
                />
              </div>
            </div>
          ) : (
            ''
          )}
          {subLength >= 6 ? (
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  Alt Kategori
                  <ImportantStar />
                </label>
                <Selectrix
                  height={250}
                  customScrollbar={true}
                  placeholder="Alt Kategoriyi Seçimi Yapınız"
                  customKeys={{
                    key: 'id',
                    label: 'name',
                  }}
                  options={activeOptions6}
                  onChange={(value) => handleClick6(value.key)}
                />
              </div>
            </div>
          ) : (
            ''
          )}
          {subLength >= 7 ? (
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  Alt Kategori
                  <ImportantStar />
                </label>
                <Selectrix
                  height={250}
                  customScrollbar={true}
                  placeholder="Alt Kategoriyi Seçimi Yapınız"
                  customKeys={{
                    key: 'id',
                    label: 'name',
                  }}
                  options={activeOptions7}
                  onChange={(value) => handleClick7(value.key)}
                />
              </div>
            </div>
          ) : (
            ''
          )}
          {subLength >= 8 ? (
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  Alt Kategori
                  <ImportantStar />
                </label>
                <Selectrix
                  height={250}
                  customScrollbar={true}
                  placeholder="Alt Kategoriyi Seçimi Yapınız"
                  customKeys={{
                    key: 'id',
                    label: 'name',
                  }}
                  options={activeOptions8}
                  onChange={(value) => handleClick8(value.key)}
                />
              </div>
            </div>
          ) : (
            ''
          )}
          {subLength >= 9 ? (
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  Alt Kategori
                  <ImportantStar />
                </label>
                <Selectrix
                  height={250}
                  customScrollbar={true}
                  placeholder="Alt Kategoriyi Seçimi Yapınız"
                  customKeys={{
                    key: 'id',
                    label: 'name',
                  }}
                  options={activeOptions9}
                  onChange={(value) => handleClick9(value.key)}
                />
              </div>
            </div>
          ) : (
            ''
          )}
          {subLength >= 10 ? (
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  Alt Kategori
                  <ImportantStar />
                </label>
                <Selectrix
                  height={250}
                  customScrollbar={true}
                  placeholder="Alt Kategoriyi Seçimi Yapınız"
                  customKeys={{
                    key: 'id',
                    label: 'name',
                  }}
                  options={activeOptions10}
                  onChange={(value) => handleClick10(value.key)}
                />
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
