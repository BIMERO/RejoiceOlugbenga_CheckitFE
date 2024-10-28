"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { BiSolidEditAlt } from "react-icons/bi";
import { Button } from "primereact/button";
import { Formik } from "formik";
import AddCapsuleModal from "./AddCapsuleModal";
import { Capsule } from "@/types/capsule";
import EditCapsule from "./EditCapsule";
import { useDispatch, useSelector } from "react-redux";
import {
  setCapsulesData,
  addNewCapsule,
  editExistingCapsule,
} from "@/redux/slices/CapsuleSlicer";
import DetailsModal from "./DetailsModal";

const Capsules = () => {
  const dispatch = useDispatch();

  const capsuleData = useSelector(
    (state: { capsule: { data: Capsule[] } }) => state.capsule.data
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [filteredCapsules, setFilteredCapsules] = useState<Capsule[]>([]);
  const [addCapsule, setAddCapsule] = useState(false);
  const [editCapsule, setEditCapsule] = useState<Capsule | null>(null);
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.spacexdata.com/v3/capsules"
        );
        console.log(response.data);

        dispatch(setCapsulesData(response.data));

        setFilteredCapsules(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error fetching data");
      }
    };

    fetchCapsules();
  }, [dispatch]);

  const columns = [
    { field: "capsule_serial", header: "Capsule Serial" },
    { field: "capsule_id", header: "Capsule ID" },
    { field: "status", header: "Status" },
    {
      field: "original_launch",
      header: "Original Launch",

      body: (rowData: Capsule) =>
        moment(rowData.original_launch).format("MMMM Do, YYYY"),
    },
    { field: "landings", header: "Landings" },
    { field: "type", header: "Type" },
    { field: "details", header: "Details" },
    { field: "reuse_count", header: "Reuse Count" },
    {
      header: "Missions",
      body: (rowData: Capsule) =>
        rowData.missions?.map((mission) => mission.name).join(", "),
    },
    {
      header: "Edit",
      body: (rowData: Capsule) => (
        <button onClick={() => openEditModal(rowData)}>
          <BiSolidEditAlt className="text-2xl" />
        </button>
      ),
    },
  ];

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const handleSearch = (value: Partial<Capsule>) => {
    const filtered = capsuleData.filter((capsule: Capsule) => {
      return (
        (!value.status || capsule.status.includes(value.status)) &&
        (!value.type || capsule.type.includes(value.type)) &&
        (!value.original_launch ||
          moment(capsule.original_launch)
            .format("MMMM Do, YYYY")
            .includes(value.original_launch))
      );
    });

    setFilteredCapsules(filtered);
  };

  const OpenModal = () => {
    setAddCapsule(true);
  };

  const CloseAddModal = () => {
    setAddCapsule(false);
  };

  const handleAdd = (newCapsule: Capsule) => {
    dispatch(addNewCapsule(newCapsule));
    console.log("Adding new capsule:", newCapsule);
    setFilteredCapsules([...capsuleData, newCapsule]);
    setAddCapsule(false);
  };

  const openEditModal = (capsule: Capsule) => {
    const formattedCapsule = {
      ...capsule,
      original_launch: moment(capsule.original_launch).format("YYYY-MM-DD"),
    };
    setSelectedCapsule(null);
    setEditCapsule(formattedCapsule);
  };

  const handleEdit = (updatedCapsule: Capsule) => {
    setSelectedCapsule(null);
    console.log("Updating capsule:", updatedCapsule);

    dispatch(editExistingCapsule(updatedCapsule));

    setFilteredCapsules((prev) =>
      prev.map((rowdata) =>
        rowdata.capsule_serial === updatedCapsule.capsule_serial
          ? updatedCapsule
          : rowdata
      )
    );

    setEditCapsule(null);
  };

  const showDetails = (capsule: Capsule) => {
    setSelectedCapsule(capsule);
  };

  return (
    <div className="relative">
      <section className="contain py-24">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold mb-4">Capsules</h2>
          <button
            onClick={OpenModal}
            className="bg-brand_primary-50 text-white py-3 px-8 rounded-xl"
          >
            Add New Capsule
          </button>
        </div>

        <Formik
          initialValues={{ status: "", original_launch: "", type: "" }}
          onSubmit={() => {}}
        >
          {({ values, handleChange }) => (
            <form className="flex flex-wrap items-center justify-between mb-8 gap-4">
              <div className="flex flex-col flex-1">
                <label htmlFor="" className="text-sm font-bold mb-2">
                  Status:
                </label>
                <input
                  name="status"
                  placeholder="Status"
                  onChange={(e) => {
                    handleChange(e);
                    handleSearch({ ...values, status: e.target.value });
                  }}
                  className="border border-brand_primary-50 outline-none p-3 flex-1 rounded-md"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="" className="text-sm font-bold mb-2">
                  Original Launch Date:
                </label>
                <input
                  name="original_launch"
                  type="date"
                  placeholder="Original Launch"
                  onChange={(e) => {
                    handleChange(e);
                    handleSearch({
                      ...values,
                      original_launch: e.target.value,
                    });
                  }}
                  className="border border-brand_primary-50 outline-none p-3 flex-1 rounded-md"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="" className="text-sm font-bold mb-2">
                  Type:
                </label>
                <input
                  name="type"
                  placeholder="Type"
                  onChange={(e) => {
                    handleChange(e);
                    handleSearch({ ...values, type: e.target.value });
                  }}
                  className="border border-brand_primary-50 outline-none p-3 flex-1 rounded-md"
                />
              </div>
            </form>
          )}
        </Formik>

        <DataTable
          value={filteredCapsules}
          loading={loading}
          stripedRows
          paginator
          rows={5}
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          emptyMessage={error ? "Error loading data" : "No data found"}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          showGridlines
          onRowClick={(e) => showDetails(e.data as Capsule)}
        >
          {columns.map((col, i) => (
            <Column
              key={i}
              field={col.field}
              header={col.header}
              body={col.body}
              style={{ textAlign: "center", padding: "1.25rem" }}
            />
          ))}
        </DataTable>
      </section>

      {addCapsule && (
        <AddCapsuleModal onAdd={handleAdd} onClose={CloseAddModal} />
      )}

      {editCapsule && (
        <EditCapsule
          onEdit={handleEdit}
          capsulesData={editCapsule}
          onClose={() => setEditCapsule(null)}
        />
      )}

      {selectedCapsule && (
        <DetailsModal
          selectedCapsule={selectedCapsule}
          onClose={() => setSelectedCapsule(null)}
        />
      )}
    </div>
  );
};

export default Capsules;
