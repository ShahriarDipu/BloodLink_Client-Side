import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
      if (!isOpen) return null;
  return (
  

<AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-7 h-7 text-red-600" />
          </div>

          {/* Text */}
          <h2 className="text-lg font-semibold text-center text-gray-900">
            Delete Donation Request?
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            This action cannot be undone.
          </p>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 h-11 rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>


   
  )
}
