import React, { useState, useEffect } from 'react';
import Selectrix from 'react-selectrix';
import { ToastContainer, toast } from 'react-toastify';
import CategoryTree from './CategoryTree';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ apiKey, supplierId }) {
  const ImportantStar = () => {
    return <span className="text-danger">*</span>;
  };
  useEffect(() => {
    if (categories === null) {
      fetch(`https://app.myeasytrades.com/api/trendyol/category-tree/${apiKey}`)
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
  const [attributeData, setAttributeData] = useState([]);
  const [attributesLoading, setAttributesLoading] = useState(true);
  const [attributesView, setAttributesView] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [title, setTitle] = useState('');
  const [productMainId, setProductMainId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [stockCode, setStockCode] = useState('');
  const [dimensionalWeight, setDimensionalWeight] = useState('');
  const [description, setDescription] = useState('');
  const [currencyType, setCurrencyType] = useState('');
  const [listPrice, setListPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [vatRate, setVatRate] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [stringAttributesS, setStringAttributes] = useState({});
  const selectedAttributes = [];
  const stringAttributes = {};

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new Object();

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
    formData.cargoCompanyId = cargoCompanyId;
    formData.barcode = barcode;
    formData.title = title;
    formData.productMainId = productMainId;
    formData.quantity = quantity;
    formData.stockCode = stockCode;
    formData.dimensionalWeight = dimensionalWeight;
    formData.description = description;
    formData.currencyType = currencyType;
    formData.listPrice = listPrice;
    formData.salePrice = salePrice;
    formData.vatRate = vatRate;
    let cache = [];
    Object.entries(stringAttributesS).forEach(([key, value]) => {
      cache.push({
        attributeId: key,
        customAttributeValue: value,
      });
    });
    formData.attributes = [...attributes, ...cache];
    console.log(formData);
  };

  const getCategoryAttributes = (id) => {
    fetch(
      `https://app.myeasytrades.com/api/trendyol/category-attributes/${apiKey}/` +
        id
    )
      .then((response) => response.json())
      .then((data) => {
        setAttributeData(data);
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
                    onChange={(e) => {
                      addAttribute(
                        attribute.attribute.id,
                        e.target.value,
                        'input'
                      );
                    }}
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
                      addAttribute(attribute.attribute.id, value.key, 'select')
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
  const addAttribute = (attributeId, attributeValueId, type) => {
    if (type === 'select') {
      if (attributeValueId !== undefined) {
        selectedAttributes.push({
          attributeId: attributeId,
          attributeValueId: attributeValueId,
        });

        setAttributes(selectedAttributes);
      } else {
        let cache = selectedAttributes.filter(
          (index) => index.attributeId === attributeId
        );
        cache.forEach((f) =>
          selectedAttributes.splice(
            selectedAttributes.findIndex(
              (e) => e.attributeId === f.attributeId
            ),
            1
          )
        );
        setAttributes(selectedAttributes);
      }
    } else {
      if (attributeValueId === '') {
        delete stringAttributes[`${attributeId}`];
      } else {
        stringAttributes[`${attributeId}`] = attributeValueId;
      }
      setStringAttributes(stringAttributes);
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
                onChange={(e) => {
                  setBarcode(e.target.value);
                }}
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
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
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
                onChange={(e) => {
                  setProductMainId(e.target.value);
                }}
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
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
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
                  url: `https://app.myeasytrades.com/api/trendyol/providers/${apiKey}`,
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
                  url: `https://app.myeasytrades.com/api/trendyol/brands/${apiKey}/`,
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
                onChange={(e) => {
                  setStockCode(e.target.value);
                }}
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
                onChange={(e) => {
                  setDimensionalWeight(e.target.value);
                }}
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
                name="currencyType"
                onChange={(e) => {
                  setCurrencyType(e.target.value);
                }}
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
                onChange={(e) => {
                  setListPrice(e.target.value);
                }}
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
                onChange={(e) => {
                  setSalePrice(e.target.value);
                }}
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
                onChange={(e) => {
                  setVatRate(e.target.value);
                }}
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
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
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
