import React from "react";
import { Capsule } from "@/types/capsule";
import { FaXmark } from "react-icons/fa6";
import moment from "moment";

const DetailsModal = ({
  selectedCapsule,
  onClose,
}: {
  selectedCapsule: Capsule;
  onClose: () => void;
}) => {
  return (
    <section className="bg-black/20 w-screen h-full absolute top-0 left-0 flex items-center justify-center">
      <div className="contain w-full flex items-center justify-center">
        <div className="bg-white max-w-3xl p-8 rounded-xl ">
          <header className="flex flex-wrap items-center justify-between gap-4 w-full border-b border-brand_primary-50 py-3 mb-5">
            <h3 className="text-2xl font-medium">Capsule Details</h3>
            <FaXmark className="text-2xl cursor-pointer" onClick={onClose} />
          </header>

          <div className="flex gap-4 mb-4">
            <h3 className="text-lg font-bold ">Capsule Serial:</h3>
            <p>{selectedCapsule.capsule_serial}</p>
          </div>

          <div className="flex gap-4 mb-4">
            <h3 className="text-lg font-bold ">Capsule ID:</h3>
            <p>{selectedCapsule.capsule_id}</p>
          </div>

          <div className="flex gap-4 mb-4">
            <h3 className="text-lg font-bold ">Status:</h3>
            <p>{selectedCapsule.status}</p>
          </div>

          <div className="flex gap-4 mb-4">
            <h3 className="text-lg font-bold ">Original Launch:</h3>
            <p>
              {moment(selectedCapsule.original_launch).format("MMMM Do, YYYY")}
            </p>
          </div>

          <div className="flex gap-4 mb-4">
            <h3 className="text-lg font-bold ">Type:</h3>
            <p>{selectedCapsule.type}</p>
          </div>

          <div className="flex gap-4 mb-4">
            <h3 className="text-lg font-bold ">Landing:</h3>
            <p>{selectedCapsule.landings}</p>
          </div>

          <div className="flex gap-4 mb-4">
            <h3 className="text-lg font-bold ">Details:</h3>
            <p>{selectedCapsule.details}</p>
          </div>

          <div className="flex gap-4 mb-4">
            <h3 className="text-lg font-bold ">Missions</h3>
            <p>{selectedCapsule.missions?.map((mission) => mission.name)}</p>
          </div>

          <div className="flex gap-4 mb-4">
            <h3 className="text-lg font-bold ">Reuse Count</h3>
            <p>{selectedCapsule.reuse_count}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsModal;
