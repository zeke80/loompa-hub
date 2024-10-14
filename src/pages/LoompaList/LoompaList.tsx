import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Loompa,
  LoompaService,
} from "../../services/loompa-service/loompa.service";
import "./LoompaList.css";
import LoompaSimpleDetail from "./components/LoompaSimpleDetail/LoompaSimpleDetail";
import { setLoompas, setPage } from "../../redux/loompaDataSlice";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function LoompaList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let loompas = useSelector((state: any) => state.loompaData.loompas);
  let page = useSelector((state: any) => state.loompaData.page);
  let [search, setSearch] = useState("");

  useEffect(() => {
    if (page === 1) {
      LoompaService.list(page)
        .then((data) => {
          const newLoompas = data.filter(
            (newLoompa: Loompa) =>
              !loompas?.some((loompa: Loompa) => loompa.id === newLoompa.id)
          );
          const auxLoompas = [...loompas, ...newLoompas].sort(
            (a, b) => a.id - b.id
          );
          localStorage.setItem("loompas", JSON.stringify(auxLoompas));
          localStorage.setItem("page", String(page + 1));
          dispatch(setLoompas(auxLoompas));
          dispatch(setPage(page + 1));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    const onscroll = async () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const isReachBottom = document.body.scrollHeight <= scrolledTo;
      if (isReachBottom) {
        LoompaService.list(page).then((data) => {
          const newLoompas = data.filter(
            (newLoompa: Loompa) =>
              !loompas?.some((loompa: Loompa) => loompa.id === newLoompa.id)
          );
          const auxLoompas = [...loompas, ...newLoompas].sort(
            (a, b) => a.id - b.id
          );
          localStorage.setItem("loompas", JSON.stringify(auxLoompas));
          localStorage.setItem("page", String(page + 1));
          dispatch(setLoompas(auxLoompas));
          dispatch(setPage(page + 1));
        });
      }
    };
    window.addEventListener("scroll", onscroll);
    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, [page]);

  return (
    <div className="d-flex justify-content-center">
      <div className="layout d-grid gap-5 text-center px-3 px-lg-5 mt-4">
        <div className="d-flex justify-content-center justify-content-xl-end">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <div>
          <h1>Find your Oompa Loompa</h1>
          <h2 className="fw-light">There are more than 100k</h2>
        </div>
        <div className="row text-start">
          {loompas
            .filter(
              (loompa: Loompa) =>
                `${loompa.firstName} ${loompa.lastName}`
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                loompa.profession.toLowerCase().includes(search.toLowerCase())
            )
            .map((loompa: Loompa) => (
              <div
                key={loompa.id}
                className="loompa-detail col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 p-4"
                onClick={() => navigate(`/${loompa.id}`)}
              >
                <LoompaSimpleDetail {...loompa} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
