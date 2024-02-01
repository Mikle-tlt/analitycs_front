import React, { useEffect, useState } from 'react';
import { useProfilesStore } from "../../services/profiles/profiles-service";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";

const Profiles = () => {
  const { profiles, getProfiles, updateProfile, deleteProfile } = useProfilesStore();
  const [updatedProfiles, setUpdatedProfiles] = useState([]);

  useEffect(() => {
    getProfiles();
  }, []);

  const handleRoleChange = (userId, event) => {
    const newProfiles = [...updatedProfiles];
    newProfiles[userId] = { ...newProfiles[userId], role: event.target.value };
    setUpdatedProfiles(newProfiles);
  };

  const updateUser = async (e, userId) => {
    e.preventDefault();
    const { role } = updatedProfiles[userId];
    if (updatedProfiles[userId]) {
      await updateProfile(role, userId)
        .then(() => {
          toast.success("Профиль успешно изменен!", options)
        })
        .catch((e) => toast.error(e, options))
    }
  };

  const deleteUser = async (userId) => {
    await deleteProfile(userId)
      .then(() => {
        toast.success("Профиль успешно удален!", options)
      })
      .catch((e) => toast.error(e, options))
  };

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Профили</span></h1>
          </div>
        </div>
        {!profiles && <p>Сотрудники не найдены</p>}
        {profiles && profiles.map((profile) => (
          <form className="mb-2" key={profile.id} onSubmit={(e) => {  updateUser(e, profile.id) }}>
            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  value={profile.username}
                  type="text"
                  name="name"
                  placeholder="Имя"
                  required
                  readOnly
                />
              </div>
              <div className="col-auto">
                <select
                  className="form-control"
                  name="role"
                  required
                  value={updatedProfiles[profile.id]?.role || profile.role}
                  onChange={(e) => handleRoleChange(profile.id, e)}
                >
                  <option value='MANAGER'>Менеджер</option>
                  <option value='ADMIN'>Админ</option>
                </select>
              </div>
              <div className="col-auto">
                <button className="btn btn-info" type="submit">Обновить</button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => deleteUser(profile.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
};

export default Profiles;
