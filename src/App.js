import React, { useState, useEffect } from 'react';
import Selectrix from 'react-selectrix';
import { ToastContainer, toast } from 'react-toastify';
import CategoryTree from './CategoryTree';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const apikey = 'REM3aldBdkpNcVN3dWFMczFSTE06MExSZ2FvbHRiQ2QycEtCbldRRWI=';
const id = 464770;

export default function App() {
  const ImportantStar = () => {
    return <span className="text-danger">*</span>;
  };
  useEffect(() => {
    if (categories === null) {
      fetch(
        'https://app.myeasytrades.com/api/trendyol/category-tree/REM3aldBdkpNcVN3dWFMczFSTE06MExSZ2FvbHRiQ2QycEtCbldRRWI='
      )
        .then((response) => response.json())
        .then((data) => {
          setCategories(data);
          setLoading(false);
        });
    }
  }, []);
  const [brandId, setBrandId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [cargoCompanyId, setCargoCompanyId] = useState(0);
  const [attributeData, setAttributeData] = useState(null);
  const [attributesLoading, setAttributesLoading] = useState(true);
  const [attributesView, setAttributesView] = useState([]);
  const selectedAttributes = [];

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new Object();
    for (let i = 0; i < 15; i++) {
      if (event.target[i]?.name !== undefined)
        formData[event.target[i].name] = event.target[i].value;
    }
    if (brandId === 0 || brandId === undefined) {
      return toast.warning('Lütfen Marka Seçimi Yapınız');
    }
    if (categoryId === 0 || categoryId === undefined) {
      return toast.warning('Lütfen Kategori Seçimi Yapınız');
    }
    if (cargoCompanyId === 0 || cargoCompanyId === undefined) {
      return toast.warning('Lütfen Kargo Şirketi Seçimi Yapınız');
    }
    formData.brandId = brandId;
    formData.categoryId = categoryId;
    alert(JSON.stringify(formData));
  };

  const getCategoryAttributes = (id) => {
    fetch(
      'https://app.myeasytrades.com/api/trendyol/category-attributes/REM3aldBdkpNcVN3dWFMczFSTE06MExSZ2FvbHRiQ2QycEtCbldRRWI=/' +
        id
    )
      .then((response) => response.json())
      .then((data) => {
        setAttributeData(data);
        console.log(data);
        prepareAttributesView(data);
      });
  };
  const prepareAttributesView = (data) => {
    if (data.categoryAttributes) {
      let cacheData = [];
      data.categoryAttributes.map((attribute) => {
        cacheData.push(
          <div className="col-md-3" key={attribute.attribute.id}>
            <div className="mb-3">
              <label className="form-label">
                {attribute.attribute.name}
                {attribute.required && <ImportantStar />}
              </label>
              {attribute.allowCustom === true ? (
                <>
                  <input
                    required
                    type="text"
                    placeholder={attribute.attribute.name + ' Giriniz'}
                    className="form-control"
                  />
                </>
              ) : (
                <>
                  <Selectrix
                    height={250}
                    customScrollbar={true}
                    customKeys={{
                      key: 'id',
                      label: 'name',
                    }}
                    options={attribute.attributeValues}
                    placeholder={attribute.attribute.name + ' Seçimi Yapınız'}
                    onChange={(value) =>
                      addAttribute(attribute.attribute.id, value.key,'select')
                    }
                  />
                </>
              )}
            </div>
          </div>
        );
      });
      setAttributesView(cacheData);
      cacheData = [];
      setAttributesLoading(false);
    }
  };
  const addAttribute = (attributeId, attributeValueId,type) => {
    if(type === 'select'){
      if(attributeValueId !== undefined){

      }else{
        
      }
    }else{

    }
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Barkod
                <ImportantStar />{' '}
                <small className="text-muted">(Max 40 karakter) </small>
              </label>
              <input
                required
                type="text"
                className="form-control"
                name="barcode"
                maxLength="40"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Başlık
                <ImportantStar />{' '}
                <small className="text-muted">(Max 100 karakter)</small>
              </label>
              <input
                required
                type="text"
                className="form-control"
                name="title"
                maxLength="100"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Ürün Kodu
                <ImportantStar />{' '}
                <small className="text-muted">(Max 40 karakter)</small>
              </label>
              <input
                required
                type="text"
                className="form-control"
                name="productMainId"
                maxLength="40"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Stok Miktarı
                <ImportantStar />
              </label>
              <input
                required
                type="number"
                className="form-control"
                name="quantity"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Kargo Şirketi
                <ImportantStar />{' '}
                <small
                  className="text-warning"
                  onClick={(e) => {
                    toast.info(
                      'Trendyol İle Anlaşmalı Olduğunuz Kargo Şirketini Seçmemeniz Durumunda Ürün Trendyol Tarafınca Onaylanmayacaktır.',
                      {
                        duration: 2000,
                      }
                    );
                  }}
                  title="Trendyol İle Anlaşmalı Olduğunuz Kargo Şirketini Seçmemeniz Durumunda Ürün Trendyol Tarafınca Onaylanmayacaktır."
                >
                  (Lütfen Buraya Tıklayınız)
                </small>
              </label>
              <Selectrix
                height={250}
                customScrollbar={true}
                customKeys={{
                  key: 'id',
                  label: 'name',
                }}
                ajax={{
                  url: 'https://app.myeasytrades.com/api/trendyol/providers/REM3aldBdkpNcVN3dWFMczFSTE06MExSZ2FvbHRiQ2QycEtCbldRRWI=',
                }}
                placeholder="Kargo Şirketi Seçimi Yapınız"
                onChange={(value) => setCargoCompanyId(value.key)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Marka
                <ImportantStar />
              </label>
              <Selectrix
                height={250}
                customScrollbar={true}
                placeholder="Marka Seçimi Yapınız"
                customKeys={{
                  key: 'id',
                  label: 'name',
                }}
                ajax={{
                  url: 'https://app.myeasytrades.com/api/trendyol/brands/REM3aldBdkpNcVN3dWFMczFSTE06MExSZ2FvbHRiQ2QycEtCbldRRWI=/',
                  fetchOnSearch: true,
                  q: '{q}',
                  minLength: 3,
                }}
                onChange={(value) => setBrandId(value.key)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Stok Kodu
                <ImportantStar />
                <small className="text-muted">(Max 100 karakter)</small>
              </label>
              <input
                required
                type="text"
                className="form-control"
                name="stockCode"
                maxLength="100"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Desi Miktarı
                <ImportantStar />
              </label>
              <input
                required
                type="number"
                className="form-control"
                name="dimensionalWeight"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Para Birimi
                <ImportantStar />
                <small className="text-muted">(TRY,USD,EUR...)</small>
              </label>
              <input
                required
                type="text"
                className="form-control"
                defaultValue="TRY"
                name="currencyrequired type"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Liste Fiyatı
                <ImportantStar /> <small className="text-muted">(PSF)</small>
              </label>
              <input
                required
                type="number"
                className="form-control"
                name="listPrice"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Satış Fiyatı
                <ImportantStar /> <small className="text-muted">(TSF)</small>
              </label>
              <input
                required
                type="number"
                className="form-control"
                name="salePrice"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                KDV Oranı
                <ImportantStar />{' '}
                <small className="text-muted">(0 , 1 , 8 , 18)</small>
              </label>
              <input
                required
                type="number"
                className="form-control"
                name="vatRate"
                max="100"
                min="0"
              />
            </div>
          </div>
          {loading === false ? (
            <>
              <CategoryTree
                categories={categories}
                setCategoryId={setCategoryId}
                getCategoryAttributes={getCategoryAttributes}
                setAttributesView={setAttributesView}
                setAttributesLoading={setAttributesLoading}
                setAttributeData={setAttributeData}
              />
            </>
          ) : (
            ''
          )}
          <div className="row">
            {categoryId !== 0 ? (
              <>
                {attributesLoading === false ? (
                  <>
                    {attributesView.map((elem) => {
                      return elem;
                    })}
                  </>
                ) : (
                  ''
                )}
              </>
            ) : (
              ''
            )}
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">
                Açıklama
                <ImportantStar />{' '}
                <small className="text-muted">(Max 30.000 Karakter)</small>
              </label>
              <textarea
                maxLength="30000"
                name="description"
                rows="5"
                className="form-control"
              ></textarea>
            </div>
          </div>
          <div className="col-md-12">
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-success">Kaydet</button>
            </div>
          </div>
        </div>
      </form>

      <ToastContainer />
    </>
  );
}
