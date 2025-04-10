"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Transition } from "@headlessui/react";
import { Button, Text } from "@/components/atoms";
import { sendMail } from "@/server/brevo/sendMail";

export const Form = ({ t }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { locale } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      mail: "",
      message: "",
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      window.dataLayer.push({
        event: "formulier_verzonden",
        userData: {
          email: data.mail,
          name: data.firstname,
        },
      });

      // Admin email
      await sendMail({
        data: {
          params: data,
          sender: {
            email: "info@degoudenkooi.be",
            name: "info@degoudenkooi.be",
          },
          replyTo: {
            email: data.mail,
            name: data.firstname,
          },
          to: {
            email:
              process.env.NODE_ENV !== "production"
                ? "indy@publiplus.be"
                : "degoudenkooi2016@gmail.com",
            name:
              process.env.NODE_ENV !== "production"
                ? "indy@publiplus.be"
                : "degoudenkooi2016@gmail.com",
          },
        },
        templateId: locale === "en" ? 4 : 2,
      });

      // Client email
      await sendMail({
        data: {
          params: data,
          sender: {
            email: "info@degoudenkooi.be",
            name: "info@degoudenkooi.be",
          },
          replyTo: {
            email: "noreply@degoudenkooi.be",
            name: "De Gouden Kooi",
          },
          to: {
            email: data.mail,
            name: data.firstname || data.mail,
          },
        },
        templateId: locale === "en" ? 5 : 3,
      });

      setShowSuccessMessage(true);
      reset();
      setIsSubmitting(false);
    } catch (e) {
      setShowErrorMessage(true);
      setIsSubmitting(false);
      console.error(e);
    }

    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
      <div className="">
        <div className="mt-2">
          <input
            placeholder={t?.firstname}
            className="block w-full placeholder:text-black/75 bg-white/50 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-primary-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary-500 sm:text-sm/6"
            {...register("firstname", { required: true })}
          />{" "}
          {errors.firstname?.type && (
            <Text level="xs" classnames="text-red-500 font-normal mt-2">
              {t?.validation[errors.firstname.type]}
            </Text>
          )}
        </div>
      </div>
      <div className="">
        <div className="mt-2">
          <input
            placeholder={t?.mail}
            {...register("mail", { required: true })}
            className="block w-full placeholder:text-black/75 bg-white/50 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-primary-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary-500 sm:text-sm/6"
          />
          {errors.mail?.type && (
            <Text level="xs" classnames="text-red-500 font-normal mt-2">
              {t?.validation[errors.mail.type]}
            </Text>
          )}
        </div>
      </div>
      <div className="">
        <div className="mt-2">
          <textarea
            placeholder={t?.message}
            {...register("message", { required: true })}
            rows={6}
            className="block w-full resize-none placeholder:text-black/75 bg-white/50 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-primary-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-secondary-500 sm:text-sm/6"
          />
          {errors.message?.type && (
            <Text level="xs" classnames="text-red-500 font-normal mt-2">
              {t?.validation[errors.message.type]}
            </Text>
          )}
        </div>
      </div>

      <div
        className={clsx(
          "flex",
          showErrorMessage || showSuccessMessage
            ? "justify-between"
            : "justify-end",
        )}
      >
        <Transition show={showSuccessMessage}>
          <div
            className={clsx([
              "transition ease-in-out",
              "data-[closed]:opacity-0",
              "data-[enter]:duration-100",
              "data-[leave]:duration-300",
            ])}
          >
            <Text classnames="text-white">{t.success}</Text>
          </div>
        </Transition>
        <Transition show={showErrorMessage}>
          <div
            className={clsx([
              "transition ease-in-out",
              "data-[closed]:opacity-0",
              "data-[enter]:duration-100",
              "data-[leave]:duration-300",
            ])}
          >
            <Text classnames="text-white">{t.error}</Text>
          </div>
        </Transition>
        <Button
          buttonType="submit"
          variant="white"
          disabled={isSubmitting}
          callToAction={t?.send}
        />
      </div>
    </form>
  );
};
