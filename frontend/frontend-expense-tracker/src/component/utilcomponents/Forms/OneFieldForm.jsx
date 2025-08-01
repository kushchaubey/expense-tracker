import style from './AddUpdateForm.module.scss';
import ButtonComponent from '../Buttons/ButtonComponent';
import { useEffect, useState } from 'react';
import { formValidation } from '../../../Utils/formValidation'; // optional
import axios from 'axios';
import { toast } from 'react-toastify';

const OneFieldForm = ({ formName, formType, dataURL, updateURL, id = null, fetchData, setmodelActive }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fieldKey = formType === 'category' ? 'categoryName' : 'userName';

  // Initialize form state
  useEffect(() => {
    setFormData({ [fieldKey]: '' });
    setErrors({ [fieldKey]: '' });

    if (formName === 'Update' && id) {
      setLoading(true);
      axios.get(`${dataURL}/${id}`)
        .then(res => {
          if (res.data.statusText === 'success') {
            setFormData({ [fieldKey]: res.data.data[fieldKey] });
          }
        })
        .catch(() => toast.error('Failed to fetch existing data'))
        .finally(() => setLoading(false));
    }
  }, [formType, formName, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: value.trim() === '' ? 'This field is required' : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = formData[fieldKey].trim() === '';
    if (isEmpty) {
      setErrors({ [fieldKey]: 'This field is required' });
      toast.error('Please fill the field');
      return;
    }

    const url = formName === 'Add' ? dataURL : `${updateURL}+${id}`;
    const method = formName === 'Add' ? 'post' : 'put';

    axios[method](url, { [fieldKey]: formData[fieldKey] })
      .then((res) => {
        if (res.data.statusText === 'success') {
          toast.success(res.data.message || `${formType} ${formName}d successfully`);
          setmodelActive(false);
          fetchData?.(); // refresh table if needed
        } else {
          toast.error(res.data.message || 'Something went wrong');
        }
      })
      .catch(() => toast.error('Server error'));
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className={style.formConatainer}>
      <h3>{formName} {formType.charAt(0).toUpperCase() + formType.slice(1)}</h3>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor={fieldKey}>{formType} Name</label>
          <input
            type="text"
            id={fieldKey}
            name={fieldKey}
            value={formData[fieldKey] || ''}
            onChange={handleChange}
          />
          <div className={style.error}>{errors[fieldKey]}</div>
        </div>
        <div className={style.formGroup}>
          <ButtonComponent>{formName} {formType}</ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default OneFieldForm;
