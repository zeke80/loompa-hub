import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Loompa,
  LoompaService,
} from "../../services/loompa-service/loompa.service";
import "./LoompaDetail.css";
import { setLoompas } from "../../redux/loompaDataSlice";

export default function LoompaDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loompas = useSelector((state: any) => state.loompaData.loompas);
  const [loompa, setLoompa] = useState<Loompa | null>(null);

  useEffect(() => {
    const foundLoompa = loompas.find(
      (loompa: Loompa) => loompa.id === Number(id)
    );
    if (foundLoompa) {
      setLoompa(foundLoompa);
    } else {
      LoompaService.get(String(id))
        .then((data) => {
          const updatedLoompas = [...loompas, { ...data, id: Number(id) }];
          localStorage.setItem("loompas", JSON.stringify(updatedLoompas));
          dispatch(setLoompas(updatedLoompas));
          setLoompa({ ...data, id: Number(id) });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  if (!loompa) return null;

  return (
    <div className="d-flex w-100 justify-content-center mt-5">
      <div className="d-flex flex-column flex-lg-row gap-4 px-3 px-lg-5 mb-3">
        <div>
          <img
            className="loompa-img w-100 h-100 object-fit-cover"
            src={loompa?.image}
            alt="loompa-img"
          />
        </div>
        <div>
          <div className="d-grid gap-4">
            <div>
              <p className="m-0 fs-5 fw-bold">
                {loompa?.firstName} {loompa?.lastName}
              </p>
              <p className="m-0 fw-light">
                {loompa?.gender === "M" ? "Man" : "Woman"}
              </p>
              <p className="m-0 fw-light fst-italic">{loompa?.profession}</p>
            </div>
            <div className="h-100 overflow-y-scroll">
              <p
                className="loompa-description text-break"
                dangerouslySetInnerHTML={{ __html: loompa.favorite.song }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
