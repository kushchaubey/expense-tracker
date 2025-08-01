import style from './AddUpdateForm.module.scss';
import ButtonComponent from '../Buttons/ButtonComponent';
import { useEffect, useState } from 'react';
import { formValidation } from '../../../Utils/formValidation';
import { getdataBasedOnURL } from '../../../Utils/FetchingUtil';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddUpdateForm = ({ formName, id, fetchExpense, setmodelActive }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    cost: '',
    category: '',
    user: '',
    date: ''
  });

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    itemName: '',
    cost: '',
    category: '',
    user: '',
    date: ''
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    getdataBasedOnURL("http://localhost:3000/api/categories", setCategories, setLoading);
    getdataBasedOnURL("http://localhost:3000/api/users", setUsers, setLoading);

    if (formName === 'Add') {
      setFormData({
        itemName: '',
        cost: '',
        category: '',
        user: '',
        date: today
      });
    } else if (formName === 'Update' && id) {
      fetchDataById();
    }
  }, [formName, id]);

  const fetchDataById = () => {
    setLoading(true);
    axios.get(`http://localhost:3000/api/expenses/${id}`)
      .then(res => {
        if (res.data.statusText === "success") {
          const data = res.data.data;
          setFormData({
            itemName: data.itemName || '',
            cost: data.cost || '',
            category: data.category?.id || '',
            user: data.user?.id || '',
            date: data.date || ''
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching expense:", err);
        toast.error("Failed to load expense");
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    let errMessage = '';
    switch (name) {
      case 'itemName': errMessage = formValidation.validateItemName(value); break;
      case 'cost': errMessage = formValidation.validateCost(value); break;
      case 'category': errMessage = formValidation.validateCategory(value); break;
      case 'user': errMessage = formValidation.validateUser(value); break;
      case 'date': errMessage = formValidation.validateDate(value); break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: errMessage
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {
      itemName: formValidation.validateItemName(formData.itemName),
      cost: formValidation.validateCost(formData.cost),
      category: formValidation.validateCategory(formData.category),
      user: formValidation.validateUser(formData.user),
      date: formValidation.validateDate(formData.date)
    };

    setErrors(validationErrors);

    const hasError = Object.values(validationErrors).some(error => error !== '');
    if (hasError) {
      toast.error("Validation failed");
      return;
    }

    const url = formName === "Add"
      ? 'http://localhost:3000/api/expenses'
      : `http://localhost:3000/api/expenses/update/${id}`;

    const method = formName === "Add" ? axios.post : axios.put;

    method(url, formData)
      .then(response => {
        if (response.data.statusText === "success") {
          toast.success(response.data.message);
          fetchExpense();
          setmodelActive(false);
        }
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  if (loading) return <h1>Loading...</h1>;
  if (formName === "Add" && (users.length === 0 || categories.length === 0)) {
    return <h1>No users or categories found</h1>;
  }

  return (
    <div className={style.formConatainer}>
      <h3>{formName} Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="itemName">Item Name</label>
          <input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleChange} />
          <div className={style.error}>{errors.itemName}</div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="cost">Cost</label>
          <input type="number" id="cost" name="cost" value={formData.cost} onChange={handleChange} />
          <div className={style.error}>{errors.cost}</div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select</option>
            {categories.map(data => (
              <option key={data.id} value={data.id}>{data.categoryName}</option>
            ))}
          </select>
          <div className={style.error}>{errors.category}</div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="user">User</label>
          <select id="user" name="user" value={formData.user} onChange={handleChange}>
            <option value="">Select</option>
            {users.map(data => (
              <option key={data.id} value={data.id}>{data.userName}</option>
            ))}
          </select>
          <div className={style.error}>{errors.user}</div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
          <div className={style.error}>{errors.date}</div>
        </div>

        <div className={style.formGroup}>
          <ButtonComponent>{formName} Expense</ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default AddUpdateForm;



