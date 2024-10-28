"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { BiSolidEditAlt } from "react-icons/bi";
import { Button } from "primereact/button";
import { Field, Form, Formik } from "formik";
import AddCapsuleModal from "./AddCapsuleModal";
import { Capsule } from "@/types/capsule";
import EditCapsule from "./EditCapsule";
import { useDispatch, useSelector } from "react-redux";
import {
  setCapsulesData,
  addNewCapsule,
  editExistingCapsule,
} from "@/redux/slices/CapsuleSlicer";

const Capsules = () => {
  const dispatch = useDispatch();

  const capsuleData = useSelector((state: any) => state.capsule.data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [filteredCapsules, setFilteredCapsules] = useState<Capsule[]>([]);
  const [addCapsule, setAddCapsule] = useState(false);
  const [editCapsule, setEditCapsule] = useState<Capsule | null>(null);

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

      body: (rowData: any) =>
        moment(rowData.original_launch).format("MMMM Do, YYYY"),
    },
    { field: "landings", header: "Landings" },
    { field: "type", header: "Type" },
    { field: "details", header: "Details" },
    { field: "reuse_count", header: "Reuse Count" },
    {
      header: "Missions",
      // body: (rowData: any) =>
      //   rowData.missions.map((mission: any) => mission.name).join(", "),
    },
    {
      header: "Edit",
      body: (rowData: Capsule) => (
        <button onClick={() => openEditModal(rowData)}>
          <BiSolidEditAlt />
        </button>
      ),
    },
  ];

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const handleSearch = (value: any) => {
    const filtered = capsulesData.filter((capsule: any) => {
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

  const handleAdd = (newCapsule: Capsule) => {
    dispatch(addNewCapsule(newCapsule));
    console.log("Adding new capsule:", newCapsule);
    setAddCapsule(false);
  };

  const openEditModal = (capsule: Capsule) => {
    const formattedCapsule = {
      ...capsule,
      original_launch: moment(capsule.original_launch).format("YYYY-MM-DD"), // Format the date
    };
    setEditCapsule(formattedCapsule);
  };

  const handleEdit = (updatedCapsule: Capsule) => {
    console.log("Updating capsule:", updatedCapsule);

    dispatch(editExistingCapsule(updatedCapsule));

    // setFilteredCapsules((prev) =>
    //   prev.map((rowdata) =>
    //     rowdata.capsule_serial === updatedCapsule.capsule_serial
    //       ? updatedCapsule
    //       : rowdata
    //   )
    // );

    setEditCapsule(null);
  };

  return (
    <>
      <section className="contain">
        <h2>Capsules</h2>

        <div>
          <button onClick={OpenModal}>Add New Capsule</button>
        </div>

        <Formik initialValues={{ status: "", original_launch: "", type: "" }}>
          {({ values, handleChange }) => (
            <Form>
              <Field
                name="status"
                placeholder="Status"
                onChange={(e) => {
                  handleChange(e);
                  handleSearch({ ...values, status: e.target.value });
                }}
              />
              <Field
                name="original_launch"
                placeholder="Original Launch"
                onChange={(e) => {
                  handleChange(e);
                  handleSearch({ ...values, original_launch: e.target.value });
                }}
              />
              <Field
                name="type"
                placeholder="Type"
                onChange={(e) => {
                  handleChange(e);
                  handleSearch({ ...values, type: e.target.value });
                }}
              />
            </Form>
          )}
        </Formik>

        <DataTable
          value={capsuleData}
          loading={loading}
          stripedRows
          paginator
          rows={5}
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          emptyMessage={error ? "Error loading data" : "No data found"}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          showGridlines
        >
          {columns.map((col, i) => (
            <Column
              key={i}
              field={col.field}
              header={col.header}
              body={col.body}
            />
          ))}
        </DataTable>
      </section>

      {addCapsule && <AddCapsuleModal onAdd={handleAdd} />}

      {editCapsule && (
        <EditCapsule
          onEdit={handleEdit}
          capsulesData={editCapsule}
          onClose={() => setEditCapsule(null)}
        />
      )}
    </>
  );
};

export default Capsules;
