import React, {useEffect} from 'react';
import {useCategoriesStore} from "../../services/categories/categories-service";
import {useUserStore} from "../../services/user/user-service";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";

const Categories = () => {
  const { categories, addCategory, deleteCategory, getCategories, updateCategory } = useCategoriesStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const categoryAdd = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    await addCategory(name, user.id)
      .then(() => {
        toast.success("Категория успешно добавлена!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const categoryEdit = async (e, categoryId) => {
    e.preventDefault();
    const name = e.target.name.value;
    await updateCategory(name, categoryId)
      .then(() => {
        toast.success("Категория успешно изменена!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const categoryDelete= async (categoryId) => {
    await deleteCategory(categoryId)
      .then(() => {
        toast.success("Категория успешно удалена!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  useEffect(() => {
    if (!user.id) {
      navigate('/')
    }
    getCategories(user.id)
  }, [])

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Категории</span></h1>
          </div>
        </div>

        <form onSubmit={(e) => categoryAdd(e)}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="text" name="name" placeholder="Имя" required />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Добавить</button>
            </div>
          </div>
        </form>
        <hr />
          {!categories && <p>Категории не найдены</p>}
          {categories && categories.map((category) => (
            <form className="mb-2" key={category.id}
                  onSubmit={(e) => categoryEdit(e, category.id)}>
              <div className="row">
                <div className="col">
                  <input className="form-control" type="text" required name="name" defaultValue={category.name} />
                </div>
                <div className="col-auto">
                  <button className="btn btn-info" type="submit">Обновить</button>
                </div>
                <div className="col-auto">
                  <a className="btn btn-danger" onClick={() => categoryDelete(category.id)}>Удалить</a>
                </div>
              </div>
            </form>
          ))}

      </div>
    </section>
  );
};

export default Categories;