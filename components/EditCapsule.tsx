import React from "react";
import { Capsule } from "@/types/capsule";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { FaXmark } from "react-icons/fa6";

const EditCapsule = ({
  onEdit,
  capsulesData,
  onClose,
}: {
  onEdit: (capsule: Capsule) => void;
  capsulesData: Capsule;
  onClose: () => void;
}) => {
  const validationSchema = Yup.object().shape({
    capsule_serial: Yup.string().required("Capsule serial is required"),
    capsule_id: Yup.string().required("Capsule ID is required"),
    status: Yup.string().required("Status is required"),
    original_launch: Yup.date()
      .required("Original launch date is required")
      .typeError("Please enter a valid date"),
    type: Yup.string().required("Type is required"),
    details: Yup.string(), // Optional field
    landings: Yup.number()
      .min(0, "Landings must be a non-negative number")
      .required("Landings are required"),
    reuse_count: Yup.number()
      .min(0, "Reuse count must be a non-negative number")
      .required("Reuse count is required"),
    missions: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Mission name is required"),
        flight: Yup.number().required("Flight number is required").min(1),
      })
    ),
  });

  const initialValues: Capsule = {
    ...capsulesData,
  };

  const handleSubmit = (values: Capsule) => {
    console.log("Submitting updated capsule:", values);
    onEdit(values);
    onClose();
  };

  return (
    <section className="bg-black/20 w-screen h-full absolute top-0 left-0 flex items-center justify-center">
      <div className="contain w-full">
        <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl my-10 mx-auto w-full max-w-3xl p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 w-full border-b border-brand_primary-50 py-3 mb-5">
            <h3 className="text-2xl font-medium">Edit Capsule</h3>
            <FaXmark className="text-2xl cursor-pointer" onClick={onClose} />
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="w-full">
                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Capsule Serial
                    </label>
                    <Field
                      name="capsule_serial"
                      placeholder="Capsule Serial"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="capsule_serial"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Capsule ID
                    </label>
                    <Field
                      name="capsule_id"
                      placeholder="Capsule ID"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="capsule_id"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Status
                    </label>
                    <Field
                      name="status"
                      placeholder="Status"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Original Launch
                    </label>
                    <Field
                      name="original_launch"
                      placeholder="Original Launch"
                      type="date"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="original_launch"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Type
                    </label>
                    <Field
                      name="type"
                      placeholder="Type"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Details
                    </label>
                    <Field
                      name="details"
                      placeholder="Details"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="details"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Landings
                    </label>
                    <Field
                      name="landings"
                      type="number"
                      placeholder="Landings"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="landings"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="" className="text-sm font-bold mb-2">
                      Reuse Count
                    </label>
                    <Field
                      name="reuse_count"
                      type="number"
                      placeholder="Reuse Count"
                      className="border outline-none border-brand_primary-50 rounded-md p-3"
                    />
                    <ErrorMessage
                      name="reuse_count"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="missions" className="text-sm font-bold mb-4">
                    Missions
                  </label>
                  <FieldArray name="missions">
                    {({ remove, push }) => (
                      <>
                        {values.missions?.map((mission, index) => (
                          <div key={index} className="flex gap-4 mb-3">
                            <div className="flex-1">
                              <label className="text-sm font-bold">Name</label>
                              <Field
                                name={`missions[${index}].name`}
                                placeholder="Mission Name"
                                className="border p-2 rounded w-full"
                              />
                              <ErrorMessage
                                name={`missions[${index}].name`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="text-sm font-bold">
                                Flight
                              </label>
                              <Field
                                name={`missions[${index}].flight`}
                                placeholder="Flight Number"
                                type="number"
                                className="border p-2 rounded w-full"
                              />
                              <ErrorMessage
                                name={`missions[${index}].flight`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <button
                              type="button"
                              className="text-red-500 font-bold"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push({ name: "", flight: 0 })}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Add Mission
                        </button>
                      </>
                    )}
                  </FieldArray>
                </div>

                <button
                  type="submit"
                  className="bg-brand_primary-50 text-white py-3 px-8 rounded-xl"
                >
                  Update Capsule
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default EditCapsule;
