import { Alert } from "react-native";
import * as Contacts from "expo-contacts";

/**
 * Custom hook for picking a contact and extracting their formatted phone number
 * @returns An object with a pickContact function that returns a formatted phone number or null
 */
export const useContactPicker = () => {
  const pickContact = async (): Promise<string | null> => {
    try {
      // Request permission to access contacts
      const { status } = await Contacts.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant contact permissions to select a contact."
        );
        return null;
      }

      // Present contact picker
      const picker = await Contacts.presentContactPickerAsync();

      if (picker!.phoneNumbers && picker!.phoneNumbers.length > 0) {
        // Get the first phone number
        let phoneNumber = picker!.phoneNumbers[0].number || "";

        // Clean the phone number - remove all non-numeric characters
        phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

        // Remove country code if present (assuming US +1)
        if (phoneNumber.startsWith("1") && phoneNumber.length === 11) {
          phoneNumber = phoneNumber.substring(1);
        }

        // Format as (XXX) XXX-XXXX
        if (phoneNumber.length === 10) {
          phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
          )}-${phoneNumber.slice(6)}`;
        }

        return phoneNumber;
      } else {
        Alert.alert(
          "No Phone Number",
          "The selected contact doesn't have a phone number."
        );
        return null;
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select contact. Please try again.");
      return null;
    }
  };

  return { pickContact };
};
