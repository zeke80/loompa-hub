import { memo } from "react";
import "./LoompaSimpleDetail.css";

interface Props {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  profession: string;
}

function LoompaSimpleDetail({
  id,
  firstName,
  lastName,
  gender,
  image,
  profession,
}: Props) {
  return (
    <div>
      <div>
        <img
          className="loompa-img w-100 object-fit-cover"
          src={image}
          alt={String(id)}
        />
      </div>
      <div className="my-3">
        {/* <p className="m-0 fw-light fst-italic">{id}</p> */}
        <p className="m-0 fs-5 fw-bold">
          {firstName} {lastName}
        </p>
        <p className="m-0 fw-light">{gender === "M" ? "Man" : "Woman"}</p>
        <p className="m-0 fw-light fst-italic">{profession}</p>
      </div>
    </div>
  );
}

export default memo(LoompaSimpleDetail);
