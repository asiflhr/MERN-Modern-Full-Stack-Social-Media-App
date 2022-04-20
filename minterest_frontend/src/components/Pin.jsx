import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../client';

const Pin = ({pin}) => {

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const { postedBy, image, _id, destination } = pin;

  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  let alreadySaved = pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  return (
    <div>Pin</div>
  )
}

export default Pin